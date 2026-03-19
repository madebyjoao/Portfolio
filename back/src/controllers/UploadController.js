import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import sharp from "sharp";
import { timeStamp } from "console";






async function getUploadCertificates(req, res, next) {

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { slug } = req.params;
    const file = req.files[0];
    const filename = `${timeStamp}-${slug}`;

    try {
        const uploadPath = `./uploads/${slug}/${filename}.jpg`;
        await sharp(file.buffer)
            .resize(800, 600)
            .jpeg({ quality: 80})
            .toFile(uploadPath);

        const imagePath = `${slug}/${filename}.jpg`;
        await Certificate.update(
            { image_path: imagePath },
            { where: { slug: slug } }
        );

        req.body.image = filename;
        next();

    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
}

export default { getUploadCertificates };