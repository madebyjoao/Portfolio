import express from "express";
import PortfolioController from "../controllers/PortfolioController.js";

const certificatesRouter = express.Router();

certificatesRouter.get("/:slug", PortfolioController.getCertificates);

export default certificatesRouter;
