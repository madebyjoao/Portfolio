import express from "express";
import PortfolioController from "../controllers/PortfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/slug/:slug", PortfolioController.getTemplate);
portfolioRouter.get("/project/:slug", PortfolioController.getProjects);

export default portfolioRouter;