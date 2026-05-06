import instance from "./config.js";

async function getPortfolioTemplateThree(slug) {
    return await instance.get(`portfolio/t3/${slug}`);
}

async function getPortfolioBySlug(slug) {
    return await instance.get(`portfolio/slug/${slug}`);
}

async function getCertificatesBySlug(slug) {
    return await instance.get(`certificates/${slug}`);
}

async function getProjectsBySlug(slug) {
    return await instance.get(`portfolio/projects/${slug}`);
}

export { getPortfolioTemplateThree, getPortfolioBySlug, getCertificatesBySlug, getProjectsBySlug };
