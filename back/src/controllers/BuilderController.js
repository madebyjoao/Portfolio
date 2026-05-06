import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";
import ProjectImage from "../models/ProjectImage.js";
import sharp from "sharp";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";


/* GET */

async function getPortfolioBuilder(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }
        res.status(200).json({ portfolio });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Portfolio"})
    }
}

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

/* UPDATES */

async function updatePortfolio(req, res) {

    const { slug } = req.params;
    const { id, title, about_title, about_text, is_published, template, font_navbar, font_main, font_footer, full_name, position, region, technologies } = req.body;
    const file = req.file;

    try {
        const portfolio = await Portfolio.findOne ({ where: { id }})

        if(!portfolio) {
            return res.status(404).json({ error: "Portfolio not found"})
        }

        if (file) {
            const filename = uuidv4();
            const uploadPath = `./uploads/${slug}/cv/${filename}.pdf`;
            await fs.writeFile(uploadPath, file.buffer);
            portfolio.cv_path = `${slug}/cv/${filename}.pdf`;
        }

        portfolio.title = title || portfolio.title;
        portfolio.about_title = about_title || portfolio.about_title;
        portfolio.about_text = about_text || portfolio.about_text;
        portfolio.is_published = is_published !== undefined ? is_published === "1" : portfolio.is_published;
        portfolio.template = template || portfolio.template;
        portfolio.font_navbar = font_navbar || portfolio.font_navbar;
        portfolio.font_main = font_main || portfolio.font_main;
        portfolio.font_footer = font_footer || portfolio.font_footer;
        portfolio.full_name = full_name !== undefined ? full_name : portfolio.full_name;
        portfolio.position = position !== undefined ? position : portfolio.position;
        portfolio.region = region !== undefined ? region : portfolio.region;
        const parsedTechnologies = typeof technologies === "string" ? JSON.parse(technologies) : technologies;
        portfolio.technologies = Array.isArray(parsedTechnologies) ? parsedTechnologies : portfolio.technologies;

        await portfolio.save();
        res.status(200).json({ portfolio });

    } catch (error) {
        res.status(500).json({ error: "Failed to update portfolio" });
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

{/* Delete */}

async function deleteCertificate(req, res) {
  const { id } = req.params;

  try {
    await Certificate.destroy({ where: { id } });
    res.status(204).json({ message: "Certificate Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Certificate" });
  }
}

async function deleteProject(req, res) {
  const { id } = req.params;

  try {
    await Project.destroy({ where: { id } });
    res.status(204).json({ message: "Project Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Project" });
  }
}

export default { 
    getPortfolioBuilder,
    getCertificatesBuilder, 
    getProjectsBuilder,
    updatePortfolio,
    updateCertificates,
    updateProjects,
    deleteCertificate,
    deleteProject
}