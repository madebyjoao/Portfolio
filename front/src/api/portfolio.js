import instance from "./config.js";

async function getPortfolioBySlug(slug) {
    return await instance.get(`portfolio/slug/${slug}`);
}

export { getPortfolioBySlug };

/*
async function getStats() {
  return await instance.get("overview");
}

export { getStats }; */