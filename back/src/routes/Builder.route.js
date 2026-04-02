import express from "express";
import UploadController from "../controllers/UploadController.js";
import upload from "../middlewares/UploadMulter.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import checkSlug from "../middlewares/CheckSlug.js";

const builderRouter = express.Router();
builderRouter.use((req, res, next) =>
    AuthMiddleware(req, res, next, ["CLIENT", "ADMIN"]),
);

builderRouter.post(
    "/certificates/:slug",
    checkSlug,
    upload.single("image"),
    UploadController.getUploadCertificates,
    (req, res) => {
        res.status(200).json({
            message: "Image uploaded and resized",
            image: req.body.image,
        });
    },
);

builderRouter.post(
    "/projects/:slug",
    checkSlug,
    upload.single("image"),
    UploadController.getUploadProjects,
    (req, res) => {
        res.status(200).json({
            message: "Image uploaded and resized",
            image: req.body.image,
        });
    },
);

export default builderRouter;
