import instance from "./config.js";


//POST routes
async function uploadCertificates(slug, formData) {
    return await instance.post(`builder/certificates/${slug}`, formData, {
        timeout: 10000,
    });
}

async function uploadProjects(slug, formData) {
    return await instance.post(`builder/projects/${slug}`, formData, {
        timeout: 10000,
    });
}

async function uploadProjectImages(slug, projectId, file) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("project_id", projectId);
    return await instance.post(`builder/projects/${slug}/images`, formData, {
        timeout: 10000,
    });
}

//GET routes

async function getCertificateBuilder(slug) {
    return await instance.get(`builder/certificates/${slug}`);
}


//PUT routes
async function updateCertificate(slug, formData) {
    return await instance.put(`builder/certificates/${slug}`, formData, {
         timeout: 10000,
    });
}

export { 
    uploadCertificates, 
    uploadProjects, 
    uploadProjectImages, 
    getCertificateBuilder,
    updateCertificate 
};
