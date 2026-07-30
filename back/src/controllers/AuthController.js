import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import UserController from "./UserController.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const portfolio = await Portfolio.findOne({
            where: { user_id: user.id },
        });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });

        return res.status(200).json({
            message: "Login successful",
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            slug: portfolio?.slug || null,
            token,
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

function register(req, res) {
    UserController.createUser(req, res);
    // Envoi d'email
}

function checkToken(req, res) {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by email from decoded token
        User.findOne({ where: { email: decoded.email } })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "User not found" });
                }

                return res.status(200).json({
                    email: user.email,
                    first_name: user.first_name,
                    role: user.role,
                });
            })
            .catch((error) => {
                return res.status(500).json({ error: "Database error" });
            });
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

async function changePassword(req, res) {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
        return res
            .status(400)
            .json({ error: "Current and new password are required" });
    }

    if (new_password.length < 8) {
        return res
            .status(400)
            .json({ error: "New password must be at least 8 characters" });
    }

    try {
        const isMatch = await comparePassword(
            current_password,
            req.user.password,
        );

        if (!isMatch) {
            return res
                .status(401)
                .json({ error: "Current password is incorrect" });
        }

        req.user.password = await hashPassword(new_password);
        await req.user.save();

        return res.status(200).json({ message: "Password updated" });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

export default { login, register, checkToken, changePassword };
