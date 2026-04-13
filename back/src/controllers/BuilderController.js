import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";
import ProjectImage from "../models/ProjectImage.js";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";


async function getCertificatesBuilder(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ["id"],
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        const certificates = await Certificate.findAll({
            where: { portfolio_id: portfolio.id },
        });

        res.status(200).json({ certificates });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Certificates" });
    }
}


async function getProjectsBuilder(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ["id"],
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        const projects = await Project.findAll({
            where: { portfolio_id: portfolio.id },
            include: [{ model: ProjectImage, as: "images" }],
        });

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ error: "failed to fetch Projects" });
    }
}

async function updateCertificates(req, res) {

    const { slug } = req.params;
    const { id, title, description, issuer, issued_at, type, is_public, order_index } = req.body;
    const file = req.file;
   
    try {

        const certificate = await Certificate.findOne ({ where: { id }})

        if(!certificate) {
            return res.status(404).json({ error: "Certificate not found"})
        }

        if (file) {
            const filename = uuidv4();
            const uploadPath = `./uploads/${slug}/certificates/${filename}.jpg`;
            await sharp(file.buffer)
                .resize(800, 600, { fit: "inside", withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toFile(uploadPath);
            certificate.image_path = `${slug}/certificates/${filename}.jpg`;
        }

        certificate.title = title || certificate.title;
        certificate.description = description || certificate.description;
        certificate.issuer = issuer || certificate.issuer;
        certificate.issued_at = issued_at || certificate.issued_at;
        certificate.type = type || certificate.type;
        certificate.is_public = is_public !== undefined ? is_public === "1" : certificate.is_public ;
        certificate.order_index = order_index !== undefined ? Number(order_index ) : certificate.order_index;
        await certificate.save();
        res.status(200).json({ certificate });

    } catch (error){
        res.status(500).json({ error: "Something is wrong in the update"})
    }

}

async function updateProjects(req, res) {

    try {

    } catch (error) {
        res.status(500).json({ error: "Something is wrong updating"})
    }
}

export default { 
    getCertificatesBuilder, 
    getProjectsBuilder,
    updateCertificates,
    updateProjects
}