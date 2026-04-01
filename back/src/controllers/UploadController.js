import Portfolio from "../models/Portfolio.js";
import Certificate from "../models/Certificate.js";
import sharp from "sharp";
import createUserFolder from "../utils/createFolder.js";






async function getUploadCertificates(req, res, next) {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { slug } = req.params;
    const file = req.file;
    const filename = `${Date.now()}-${slug}`;

    try {
        
        const portfolio = req.portfolio;
        
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        
        
        await createUserFolder(slug);
        
        
        const uploadPath = `./uploads/${slug}/${filename}.jpg`;
        await sharp(file.buffer)
            .resize(800, 600)
            .jpeg({ quality: 80})
            .toFile(uploadPath);

        const imagePath = `${slug}/${filename}.jpg`;
       
        await Certificate.create({
            portfolio_id: portfolio.id,
            title: req.body.title, 
            description: req.body.info,
            image_path: imagePath,
            type: "CERTIFICATE",
            is_public: true,
        });

        req.body.image = filename;

        next();

    } catch (error) {
        console.error("Upload error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
}

export default { getUploadCertificates };