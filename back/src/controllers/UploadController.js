import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";
import ProjectImage from "../models/ProjectImage.js";
import sharp from "sharp";
import { randomUUID } from 'crypto';
import {
    createUserFolderCertif,
    createUserFolderProjects,
} from "../utils/createFolder.js";

{/* CERTIFICATES */}

async function getUploadCertificates(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { slug } = req.params;
    const file = req.file;
    const filename = `${randomUUID()}-${slug}.jpg`;

    try {
        const portfolio = req.portfolio;

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        await createUserFolderCertif(slug);

        const uploadPath = `./uploads/${slug}/certificates/${filename}.jpg`;
        await sharp(file.buffer)
            .resize(800, 600, { fit: "inside", withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toFile(uploadPath);

        const imagePath = `${slug}/certificates/${filename}.jpg`;

        await Certificate.create({
            portfolio_id: portfolio.id,
            title: req.body.title,
            description: req.body.description,
            image_path: imagePath,
            type: "CERTIFICATE",
            is_public: req.body.is_public,
        });

        req.body.image = filename;

        next();
    } catch (error) {
        console.error("Upload error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({
            message: "Upload failed",
            error: error.message,
        });
    }
}

{/** 
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
*/}

{/** PROJECTS */}
async function getUploadProjects(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { slug } = req.params;
    const file = req.file;
    const filename = `${randomUUID()}-${slug}.jpg`;

    try {
        const portfolio = req.portfolio;

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        await createUserFolderProjects(slug);

        const uploadPath = `./uploads/${slug}/projects/${filename}.jpg`;
        await sharp(file.buffer)
            .resize(500, 500, { fit: "inside", withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toFile(uploadPath);

        const imagePath = `${slug}/projects/${filename}.jpg`;

        const project = await Project.create({
            portfolio_id: portfolio.id,
            title: req.body.title,
            description: req.body.info,
            thumbnail: imagePath,
            repo_url: req.body.github,
            is_public: true,
        });

        req.body.image = filename;
        req.body.project_id = project.id;

        next();
    } catch (error) {
        console.error("Upload error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({
            message: "Upload failed",
            error: error.message,
        });
    }
}

async function getUploadProjectsImages(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { slug } = req.params;
    const { project_id } = req.body;
    const file = req.file;
    const filename = `${randomUUID()}-${slug}.jpg`;

    if (!project_id) {
        return res.status(400).json({ message: "project_id is required" });
    }

    try {
        const portfolio = req.portfolio;
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        const projectRecord = await Project.findOne({
            where: { id: project_id, portfolio_id: portfolio.id },
        });

        if (!projectRecord) {
            return res.status(404).json({ message: "Project not found" });
        }

        await createUserFolderProjects(slug);

        const uploadPath = `./uploads/${slug}/projects/${filename}.jpg`;
        await sharp(file.buffer)
            .resize(1200, 900, { fit: "inside", withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toFile(uploadPath);

        const imagePath = `${slug}/projects/${filename}.jpg`;

        await ProjectImage.create({
            project_id: projectRecord.id,
            image_path: imagePath,
        });

        req.body.image = filename;

        next();
    } catch (error) {
        console.error("Upload error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({
            message: "Upload failed",
            error: error.message,
        });
    }
}

export default { getUploadCertificates, getUploadProjects, getUploadProjectsImages };
