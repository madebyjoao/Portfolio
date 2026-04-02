import Portfolio from "../models/Portfolio.js";

export default async function checkSlug(req, res, next) {
    const { slug } = req.params;

    if (!slug) {
        return res.status(400).json({ error: "Slug not present" });
    }

    if (!req.user) {
        return res.status(401).json({ error: "Authentification required" });
    }

    try {
        const portfolio = await Portfolio.findOne({
            where: { slug: slug },
        });

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        if (portfolio.user_id !== req.user.id) {
            return res.status(403).json({
                error: "Access Denied. You can only access your own Portfolio",
            });
        }

        req.portfolio = portfolio;
        return next();
    } catch (error) {
        return res.status(500).json({
            error: "Error, verification portfolio ownership",
        });
    }
}
