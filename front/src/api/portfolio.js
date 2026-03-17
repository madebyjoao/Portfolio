import instance from "./config.js";

async function getPortfolioBySlug(slug) {
    return await instance.get(`portfolio/slug/${slug}`);
}

async function getCertificatesBySlug(slug) {
    return await instance.get(`certificates/${slug}`);
}

export { getPortfolioBySlug, getCertificatesBySlug };
