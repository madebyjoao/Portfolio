import instance from "./config.js";

async function uploadCertificates(slug, formData) {
    return await instance.post(`builder/certificates/${slug}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
    });
}

async function uploadProjects(slug, formData) {
    return await instance.post(`builder/projects/${slug}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
    });
}

export { uploadCertificates, uploadProjects };
