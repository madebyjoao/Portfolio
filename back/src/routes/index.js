import express from "express";
import userRouter from "./admin/User.route.js";
import authRouter from "./Auth.route.js";
import overviewRouter from "./admin/Overview.route.js";
import portfolioRouter from "./Portfolio.route.js";


const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/overview", overviewRouter);
router.use("/portfolio", portfolioRouter);


export default router;