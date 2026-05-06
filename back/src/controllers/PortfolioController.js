import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";
import ProjectImage from "../models/ProjectImage.js";


/* Routes Per Portfolio */

async function getPortfolioThree(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ["id", "template", "title", "about_title", "about_text", "font_navbar", "font_main", "font_footer", "is_published", "full_name", "position", "region", "technologies"],
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        if (!portfolio.is_published) {
            return res.status(403).json({ error: "Portfolio not published" });
        }

        const certificates = await Certificate.findAll({
            where: {
                portfolio_id: portfolio.id,
                is_public: 1,
            },
        });

        const projects = await Project.findAll({
            where: { portfolio_id: portfolio.id },
            include: [{ model: ProjectImage, as: "images" }],
        });

        res.status(200).json({
            portfolio: portfolio,
            certificates: certificates,
            projects: projects,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch template" });
    }
}


/* open routes */
async function getTemplate(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ["id", "template", "title", "about_title", "about_text", "font_navbar", "font_main", "font_footer", "is_published", "full_name", "position", "region", "technologies"],
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        if (!portfolio.is_published) {
            return res.status(403).json({ error: "Portfolio not published" });
        }

        res.status(200).json({
            portfolio: portfolio,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch template" });
    }
}

async function getCertificates(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ["id", "is_published"],
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        if (!portfolio.is_published) {
            return res.status(403).json({ error: "Portfolio not published" });
        }

        const certificates = await Certificate.findAll({
            where: {
                portfolio_id: portfolio.id,
                is_public: 1,
            },
        });

        res.status(200).json({ certificates });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Certificates" });
    }
}

async function getProjects(req, res) {
    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ["id", "is_published"],
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        if (!portfolio.is_published) {
            return res.status(403).json({ error: "Portfolio not published" });
        }

        const projects = await Project.findAll({
            where: { portfolio_id: portfolio.id },
            include: [{ model: ProjectImage, as: "images" }],
        });
        const font = await Portfolio.findOne({
            where: { id: portfolio.id },
            attributes: ["font_main"],
        });

        res.status(200).json({ projects, font });
    } catch (error) {
        res.status(500).json({ error: "failed to fetch Projects" });
    }
}

export default { getPortfolioThree, getTemplate, getCertificates, getProjects };
