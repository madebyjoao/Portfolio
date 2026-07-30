import express from "express";
import AuthController from "../controllers/AuthController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);

authRouter.post("/register", AuthController.register);

authRouter.post("/checkToken", AuthController.checkToken);

authRouter.put(
    "/password",
    (req, res, next) => AuthMiddleware(req, res, next),
    AuthController.changePassword,
);

export default authRouter;
