import express from "express";
import PortfolioController from "../controllers/PortfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/slug/:slug", PortfolioController.getTemplate);
portfolioRouter.get("/t3/:slug", PortfolioController.getPortfolioThree);
portfolioRouter.get("/projects/:slug", PortfolioController.getProjects);

export default portfolioRouter;
