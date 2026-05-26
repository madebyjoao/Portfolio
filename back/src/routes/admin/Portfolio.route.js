import express from "express";
import AdminPortfolioController from "../../controllers/AdminPortfolioController.js";
import AuthMiddleware from "../../middlewares/AuthMiddleware.js";

const adminPortfolioRouter = express.Router();

adminPortfolioRouter.use((req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]));

adminPortfolioRouter.get("/", AdminPortfolioController.getPortfolios);

export default adminPortfolioRouter;