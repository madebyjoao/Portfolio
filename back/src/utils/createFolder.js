import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createUserFolderCertif(normalizedSlug) {
    const folderPath = path.join(
        __dirname,
        "../../uploads",
        normalizedSlug,
        "/certificates",
    );

    try {
        await fs.mkdir(folderPath, { recursive: true });
        // console.log(`Folder created: ${folderPath}`); 
        return folderPath;
    } catch (error) {
        console.error("Failed to create user certificates folder:", error);
        throw error;
    }
}

async function createUserFolderProjects(normalizedSlug) {
    const folderPath = path.join(
        __dirname,
        "../../uploads",
        normalizedSlug,
        "/projects",
    );

    try {
        await fs.mkdir(folderPath, { recursive: true });

        return folderPath;
    } catch (error) {
        console.error("Failed to create user projects folder:", error);
        throw error;
    }
}

async function createUserFolderCv(normalizedSlug) {
    const folderPath = path.join(
        __dirname,
        "../../uploads",
        normalizedSlug,
        "cv",
    );

    try {
        await fs.mkdir(folderPath, { recursive: true });
        console.log(`Folder created: ${folderPath}`); 
        return folderPath;
    } catch (err) {
        console.error("Failed to create User CV folder", error);
        throw error;
    }
}

export { createUserFolderCertif, createUserFolderProjects, createUserFolderCv };
