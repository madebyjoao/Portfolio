import User from "../models/User.js";
import { Op } from "sequelize";

async function getStats(req, res) {
  try {
    const users = await User.findAll();
    const clientCount = await User.count({ where: { role: 'CLIENT' } });


    const stats = {
      totalUsers: users.length,
      clientCount: clientCount,
      recentUsers: users.slice(0, 5),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}

export default { getStats };