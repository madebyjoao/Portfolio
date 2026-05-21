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

async function getPortfolioBuilder(slug) {
    return await instance.get(`builder/portfolio/${slug}`);
}

async function getCertificateBuilder(slug) {
    return await instance.get(`builder/certificates/${slug}`);
}

async function getProjectsBuilder(slug) {
    return await instance.get(`builder/projects/${slug}`);
}



//PUT routes
async function updatePortfolio(slug, formData) {
    return await instance.put(`builder/portfolio/${slug}`, formData, {
         timeout: 10000,
    });
}

async function updateCertificate(slug, formData) {
    return await instance.put(`builder/certificates/${slug}`, formData, {
         timeout: 10000,
    });
}

async function updateProject(slug, formData) {
    return await instance.put(`builder/projects/${slug}`, formData, {
        timeout: 10000,
    });
}

//DELETE routes

async function deleteCertificate(id) {
    return await instance.delete(`builder/certificates/${id}`);
}

async function deleteProject(id) {
    return await instance.delete(`builder/projects/${id}`);
}

async function deleteProjectImage(id) {
    return await instance.delete(`builder/projects/images/${id}`);
}

export {
    uploadCertificates,
    uploadProjects,
    uploadProjectImages,
    getPortfolioBuilder,
    getCertificateBuilder,
    getProjectsBuilder,
    updatePortfolio,
    updateCertificate,
    updateProject,
    deleteCertificate,
    deleteProject,
    deleteProjectImage
};
