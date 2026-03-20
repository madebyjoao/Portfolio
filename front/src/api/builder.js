import instance from "./config.js";

async function uploadCertificates(slug, formData) {
    return await instance.post(`builder/${slug}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds for file uploads
    });
}

export { uploadCertificates };