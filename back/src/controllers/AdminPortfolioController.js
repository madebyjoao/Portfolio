import { Portfolio, User } from "../models/index.js";

async function getPortfolios(req, res) {
    try {
        const portfolios = await Portfolio.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["first_name", "last_name"],
                },
            ],
            attributes: ["id", "slug", "title", "is_published", "created_at"],
            order: [["created_at", "DESC"]],
        });

        res.json(portfolios);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des portfolios" });
    }
}

export default { getPortfolios };