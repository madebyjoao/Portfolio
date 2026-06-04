import instance from "./config.js";

async function portfolioLive() {
    return await instance.get(`home/live`);
}


export { portfolioLive };