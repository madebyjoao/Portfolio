import User from "../models/User.js";
import { Op } from "sequelize";
import Portfolio from "../models/Portfolio.js"

async function getStats(req, res) {
try {
	const users = await User.findAll();
	const clientCount = await User.count({ where: { role: 'CLIENT' } });
	const portfolioCount = await Portfolio.count({ where: { is_published: 1 } })


	const stats = {
	totalUsers: users.length,
	clientCount: clientCount,
	portfolioCount: portfolioCount,
	recentUsers: users.slice(0, 5),
	};

	res.json(stats);
} catch (error) {
	res.status(500).json({ error: "Failed to fetch stats" });
}
}

export default { getStats };