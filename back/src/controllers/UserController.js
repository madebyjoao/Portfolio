import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import { hashPassword } from "../utils/password.js";
import fs from "fs";
import path, { dirname } from "path";
import sequelize from "../db/connection.js";
import { fileURLToPath } from "url";
import {
    createUserFolderCertif,
    createUserFolderCv,
    createUserFolderProjects,
} from "../utils/createFolder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Liste
function getUsers(req, res) {
    User.findAll().then((users) => {
        res.json(users);
    });
}
function cleanSlug(value) {
    return value
        ?.trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

// Création
async function createUser(req, res) {
    if (!req.body) {
        return res.status(400).json({ error: "Données manquantes" });
    }

    const { first_name, last_name, email, password, role, slug } = req.body;

    if (!first_name || !last_name || !email || !password || !slug) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const normalizedSlug = cleanSlug(slug);

    if (
        !normalizedSlug ||
        normalizedSlug.length < 3 ||
        normalizedSlug.length > 50
    ) {
        return res.status(400).json({ error: "Slug invalide" });
    }

    const reservedSlugs = ["admin", "api", "login", "register", "build", "u"];
    if (reservedSlugs.includes(normalizedSlug)) {
        return res.status(400).json({ error: "Slug réservé" });
    }

    const transaction = await sequelize.transaction();

    try {
        const existingEmail = await User.findOne({
            where: { email },
            transaction,
        });
        if (existingEmail) {
            await transaction.rollback();
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        const existingSlug = await Portfolio.findOne({
            where: { slug: normalizedSlug },
            transaction,
        });

        if (existingSlug) {
            await transaction.rollback();
            return res.status(400).json({ error: "Slug déjà utilisé" });
        }

        const hash = await hashPassword(password);

        const newUser = await User.create(
            {
                first_name,
                last_name,
                email,
                password: hash,
                role: role || "CLIENT",
            },
            { transaction },
        );

        const newPortfolio = await Portfolio.create(
            {
                user_id: newUser.id,
                slug: normalizedSlug,
                template_id: 1,
                is_published: false,
            },
            { transaction },
        );

        await createUserFolderCertif(normalizedSlug);
        await createUserFolderProjects(normalizedSlug);
        await createUserFolderCv(normalizedSlug)
        await transaction.commit();

        const { password: _, ...safeUser } = newUser.dataValues;

        return res.status(201).json({
            message: "Utilisateur créé",
            user: safeUser,
            portfolio: {
                id: newPortfolio.id,
                slug: newPortfolio.slug,
                template_id: newPortfolio.template_id,
                is_published: newPortfolio.is_published,
            },
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            error: "Erreur lors de la création de l'utilisateur",
            details: error.message,
        });
    }
}

// Suppression
function deleteUser(req, res) {
    const { id } = req.params;
    User.destroy({ where: { id } }).then(() => {
        res.status(204).json({ message: "Utilisateur supprimé" });
    });
}

// Modification
async function updateUser(req, res) {
    const { id } = req.params;
    const { first_name, last_name, email, password, role } = req.body;

    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;
        user.role = role || user.role;

        // Hash password only if it's being updated
        if (password) {
            user.password = await hashPassword(password);
        }

        const updatedUser = await user.save();
        const { password: _, ...safeUser } = updatedUser.dataValues;
        res.json(safeUser);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
}

// Récupérer un utilisateur par ID
function getUserById(req, res) {
    const { id } = req.params;
    User.findOne({ where: { id } }).then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    });
}

function findUserByEmail(email) {
    return User.findOne({ where: { email } });
}

// Get available roles
function getRoles(req, res) {
    res.json({
        roles: ["ADMIN", "CLIENT"],
    });
}

export default {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    findUserByEmail,
    getRoles,
};
