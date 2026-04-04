import { useState } from "react";
import { uploadProjects, uploadProjectImages } from "@/api/builder";

export default function BuilderProjects() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [github, setGithub] = useState("");
    const [imageError, setImageError] = useState("");

    const [savedProjectId, setSavedProjectId] = useState(null);
    const [extraFile, setExtraFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    function validateImage(selected) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(selected);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                const { width, height } = img;
                if (width < 250 || height < 250) {
                    return reject("Image must be at least 250×250 pixels.");
                }
                const ratio = width / height;
                if (ratio < 0.8 || ratio > 1.25) {
                    return reject(
                        "Image must be square (aspect ratio close to 1:1).",
                    );
                }
                resolve();
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject("Could not read image.");
            };
            img.src = url;
        });
    }

    async function handleFileChange(e) {
        const selected = e.target.files[0];
        if (!selected) return;
        try {
            await validateImage(selected);
            setFile(selected);
            setImageError("");
        } catch (err) {
            setFile(null);
            setImageError(err);
            e.target.value = "";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!file || !title || !info || !github) {
            alert("Please fill all fields and select an image.");
            return;
        }

        const slug = localStorage.getItem("slug");
        if (!slug) {
            alert("User slug not found. Please log in again.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("info", info);
        formData.append("github", github);

        try {
            const res = await uploadProjects(slug, formData);
            setSavedProjectId(res.data.project_id);
        } catch (error) {
            console.error("Upload failed:", error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Upload failed";
            alert(`Upload failed: ${errorMessage}`);
        }
    }

    async function handleImageUpload() {
        if (!extraFile) return;
        const slug = localStorage.getItem("slug");
        setUploading(true);
        try {
            await uploadProjectImages(slug, savedProjectId, extraFile);
            setExtraFile(null);
            document.getElementById("extra-image-input").value = "";
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || "Upload failed";
            alert(`Upload failed: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-[rgb(24,61,61)]">
                    Portfolio Builder
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="project-image-upload"
                            className="block mb-2"
                        >
                            Upload Project Image
                        </label>
                        <input
                            id="project-image-upload"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Square image required (min 250×250). Recommended:
                            500×500.
                        </p>
                        {imageError && (
                            <p className="text-xs text-red-500 mt-1">
                                {imageError}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="project-title-upload"
                            className="block mb-2"
                        >
                            Project Title
                        </label>
                        <input
                            id="project-title-upload"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="project-info-upload"
                            className="block mb-2"
                        >
                            Project Description
                        </label>
                        <input
                            id="project-info-upload"
                            type="text"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="project-github-upload"
                            className="block mb-2"
                        >
                            Github Url
                        </label>
                        <input
                            id="project-github-upload"
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Upload project
                    </button>
                </form>
            </div>

            {savedProjectId && (
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">Project saved! Add extra images</h2>
                    <p className="text-sm text-gray-500">You can add as many images as you want to this project.</p>
                    <input
                        id="extra-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setExtraFile(e.target.files[0] || null)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    <button
                        onClick={handleImageUpload}
                        disabled={!extraFile || uploading}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                    >
                        {uploading ? "Uploading..." : "Add image"}
                    </button>
                </div>
            )}
        </section>
    );
}
