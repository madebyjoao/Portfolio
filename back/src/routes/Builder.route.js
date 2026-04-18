import express from "express";
import UploadController from "../controllers/UploadController.js";
import upload from "../middlewares/UploadMulter.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import checkSlug from "../middlewares/CheckSlug.js";
import BuilderController from "../controllers/BuilderController.js";

const builderRouter = express.Router();
builderRouter.use((req, res, next) =>
    AuthMiddleware(req, res, next, ["CLIENT", "ADMIN"]),
);


{/** GET Routes */}
builderRouter.get("/certificates/:slug", checkSlug, BuilderController.getCertificatesBuilder);
builderRouter.get("/projects/:slug", checkSlug, BuilderController.getProjectsBuilder);

{/** PUT Routes */}
builderRouter.put(
    "/certificates/:slug",
    checkSlug,
    upload.single("image"),
    BuilderController.updateCertificates
);
builderRouter.put("/projects", checkSlug, BuilderController.updateProjects)

{/** Post Routes */}
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
            project_id: req.body.project_id,
        });
    },
);

builderRouter.post(
    "/projects/:slug/images",
    checkSlug,
    upload.single("image"),
    UploadController.getUploadProjectsImages,
    (req, res) => {
        res.status(200).json({
            message: "Project image uploaded",
            image: req.body.image,
        });
    },
);

{/** DELETE Routes */}

builderRouter.delete("/certificates/:id", BuilderController.deleteCertificate);
builderRouter.delete("/projects/:id", BuilderController.deleteProject);

export default builderRouter;
