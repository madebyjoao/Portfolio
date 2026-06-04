import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";


async function getLivePortfolios(req, res) {

    try {
        const live = await Portfolio.findAll({

            include: [ 
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "first_name", 
                        "last_name"
                    ],
                },
            ],
            where: {
                is_published: 1,
            },
            attributes: [
                "slug"
            ]
        });

        res.status(200).json({ live });

    } catch (error) {

        res.status(500).json({ error: "Failed to fetch live portfolios"})
        
    }
}

export default { getLivePortfolios };
