import express from "express";
import HomeController from "../controllers/HomeController.js";

const homeRouter = express.Router();

homeRouter.get("/live", HomeController.getLivePortfolios);

export default homeRouter;