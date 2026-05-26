import instance from "./config.js";

async function getAdminPortfolios() {
    return await instance.get("admin/portfolios");
}

export { getAdminPortfolios };