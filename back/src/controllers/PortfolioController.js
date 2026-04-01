import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";

async function getTemplate(req, res) {

    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({ 
            where: { slug },
            attributes: ['template', 'about_title', 'about_text']
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }
        res.status(200).json({ 
            portfolio: portfolio
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
            attributes: ['id']
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        const certificates = await Certificate.findAll({
            where: { portfolio_id: portfolio.id }
        });

        res.status(200).json({ certificates });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Certificates" });
    }
}

async function getProjects() {

    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug },
            attributes: ['id']
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        const projects = await Project.findAll({
            where: { portfolio_id: portfolio.id }
        })

        res.status(200).json({ projects })

    } catch (error) {
        res.status(500).json({ error: 'failed to fetch Projects' });
    }
}

export default { getTemplate, getCertificates, getProjects };