import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import multer from multer;
import sharp from sharp;
import { timeStamp } from "console";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })




async function getUpload(req, res, next) {

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { slug } = req.params;
    const file = req.files[0];
    const filename = `${timeStamp}-${slug}`;


    try {
        const uploadPath = `./uploads/${filename}.jpg`;
        await sharp(file.buffer)
            .resize(800, 600)
            .jpeg({ quality: 80})
            .toFile(uploadPath);


    } catch (error) {

    }
}