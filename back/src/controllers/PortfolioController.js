import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";

async function getTemplate(req, res) {

    const { slug } = req.params;

    try {
        const portfolio = await Portfolio.findOne({ 
            where: { slug },
            attributes: ['template']
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }
        res.status(200).json({ template: portfolio.template });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch template" });
    }
}

export default { getTemplate };