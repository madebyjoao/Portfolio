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

async function uploadProjectImages(slug, projectId, file) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("project_id", projectId);
    return await instance.post(`builder/projects/${slug}/images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
    });
}

export { uploadCertificates, uploadProjects, uploadProjectImages };
