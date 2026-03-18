import express from "express";
import UploadController from "../controllers/UploadController.js";
import upload from "../middlewares/UploadMulter.js";



const builderRouter = express.Router();

builderRouter.post("/:slug", 
    upload.single('image'), 
    UploadController.getUploadCertificates, 
    (req, res) => {
        res.status(200).json({ message: 'Image uploaded and resized', image: req.body.image });
    }
);

export default builderRouter;