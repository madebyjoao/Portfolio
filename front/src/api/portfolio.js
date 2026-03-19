import instance from "./config.js";

async function getPortfolioBySlug(slug) {
    return await instance.get(`portfolio/slug/${slug}`);
}

async function getCertificatesBySlug(slug) {
    return await instance.get(`certificates/${slug}`);
}

async function uploadCertificate(slug, formData) {
    return await instance.post(`builder/${slug}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export { getPortfolioBySlug, getCertificatesBySlug, uploadCertificate };
