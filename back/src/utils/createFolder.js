import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createUserFolderCertif(normalizedSlug) {
	const folderPath = path.join(__dirname, '../../uploads', normalizedSlug, '/certificates');

		try {
			await fs.mkdir(folderPath, { recursive: true });
			console.log(`Folder created: ${folderPath}`);
			return folderPath;
		} catch (err) {
			console.error('Failed to create user folder:', err);
			throw err;
		}
	}

async function createUserFolderProjects(normalizedSlug) {
	const folderPath = path.join(__dirname, '../../uploads', normalizedSlug, '/projects');

		try {
			await fs.mkdir(folderPath, { recursive: true });
			console.log(`Folder created: ${folderPath}`);
			return folderPath;
		} catch (err) {
			console.error('Failed to create user folder:', err);
			throw err;
		}
}

export { createUserFolderCertif, createUserFolderProjects }