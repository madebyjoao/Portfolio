import { useState, useRef } from "react";
import { BASE_URL } from "../../../api/config";
import {
    deleteProject,
    deleteProjectImage,
    getProjectsBuilder,
    updateProject,
    uploadProjectImages,
    uploadProjects,
} from "../../../api/builder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleX, CircleXIcon, Plus, Upload, X } from "lucide-react";
import { useNavigate } from "react-router";

const editProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    repo_url: z.string().optional().or(z.literal("")),
    live_url: z.string().optional().or(z.literal("")),
    is_public: z.stringbool(),
    order_index: z.coerce.number().int().min(1),
    image: z
        .instanceof(FileList)
        .optional()
        .refine(
            (files) =>
                !files ||
                files.length === 0 ||
                ["image/jpeg", "image/png", "image/webp"].includes(files[0].type),
            "Only JPEG, PNG and WEBP allowed"
        )
        .transform((files) => (files && files.length > 0 ? files[0] : undefined)),
});

function AccordionItem({
    project_id,
    project_title,
    project_description,
    project_thumbnail,
    project_repo_url,
    project_live_url,
    project_is_public,
    project_order_index,
    project_images,
    editModalOpen,
    onToggle,
}) {
    const slug = localStorage.getItem("slug");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(editProjectSchema),
        defaultValues: {
            title: project_title ?? "",
            description: project_description ?? "",
            repo_url: project_repo_url ?? "",
            live_url: project_live_url ?? "",
            is_public: project_is_public ? "1" : "0",
            order_index: project_order_index ?? 1,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => updateProject(slug, formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects", slug]);
            navigate(0);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteProject(id),
        onSuccess: () => window.location.reload(),
    });

    const deleteImageMutation = useMutation({
        mutationFn: (id) => deleteProjectImage(id),
        onSuccess: () => queryClient.invalidateQueries(["projects", slug]),
    });

    const [extraFile, setExtraFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    async function handleAddImage() {
        if (!extraFile) return;
        setUploading(true);
        try {
            await uploadProjectImages(slug, project_id, extraFile);
            setExtraFile(null);
            queryClient.invalidateQueries(["projects", slug]);
        } catch (error) {
            alert(error.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this project?")) {
            deleteMutation.mutate(id);
        }
    }

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("id", project_id);
        formData.append("title", data.title);
        formData.append("description", data.description ?? "");
        formData.append("repo_url", data.repo_url ?? "");
        formData.append("live_url", data.live_url ?? "");
        formData.append("is_public", data.is_public);
        formData.append("order_index", data.order_index);
        if (data.image) formData.append("image", data.image);
        mutate(formData);
    };

    const [preview, setPreview] = useState(
        project_thumbnail ? `${BASE_URL}/uploads/${project_thumbnail}` : null
    );

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setValue("image", files, { shouldValidate: true });
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    return (
        <div className="py-4">
            <div className="relative flex flex-col">
                <button
                    type="button"
                    aria-expanded={editModalOpen}
                    className="hover:cursor-pointer"
                    onClick={onToggle}
                >
                    <div className="flex items-center justify-center px-6 text-center">
                        <span className="text-base font-semibold text-(--builder-Sidebar-text)">
                            {project_title}
                        </span>
                    </div>
                    <div className="relative size-62.5 shrink-0 overflow-hidden bg-black/10">
                        <img
                            className="h-full w-full object-cover"
                            src={`${BASE_URL}/uploads/${project_thumbnail}`}
                            alt={`${project_title} Thumbnail`}
                        />
                    </div>
                </button>

                <button
                    type="button"
                    aria-label="Delete project"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project_id);
                    }}
                    className="absolute self-end top-10 right-5 cursor-pointer bg-black rounded-full p-1"
                >
                    <CircleX color="white" />
                </button>
            </div>

            {editModalOpen && (
                <div
                    onClick={onToggle}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                >
                    <div
                        className="bg-white p-6 rounded-xl w-full max-w-md overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="flex justify-self-end hover:cursor-pointer"
                            onClick={onToggle}
                        >
                            <CircleXIcon className="text-(--builder-edit-buttons) hover:text-red-500 transition-colors" />
                        </button>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register("title")}
                                    placeholder="Project title"
                                    className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                />
                                {errors.title && (
                                    <span className="text-xs text-red-500">{errors.title.message}</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700">Description</label>
                                <textarea
                                    {...register("description")}
                                    placeholder="Describe your project..."
                                    rows={3}
                                    className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                />
                                {errors.description && (
                                    <span className="text-xs text-red-500">{errors.description.message}</span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Repo URL</label>
                                    <input
                                        {...register("repo_url")}
                                        placeholder="https://github.com/..."
                                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                    />
                                    {errors.repo_url && (
                                        <span className="text-xs text-red-500">{errors.repo_url.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Live URL</label>
                                    <input
                                        {...register("live_url")}
                                        placeholder="https://..."
                                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                    />
                                    {errors.live_url && (
                                        <span className="text-xs text-red-500">{errors.live_url.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Display Order <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        {...register("order_index")}
                                        type="number"
                                        min={1}
                                        placeholder="1"
                                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                    />
                                    {errors.order_index && (
                                        <span className="text-xs text-red-500">{errors.order_index.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Visibility</label>
                                    <select
                                        {...register("is_public")}
                                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                    >
                                        <option value="1">Public</option>
                                        <option value="0">Private</option>
                                    </select>
                                    {errors.is_public && (
                                        <span className="text-xs text-red-500">{errors.is_public.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700">Thumbnail</label>
                                <label
                                    htmlFor={`project-thumb-${project_id}`}
                                    className="flex items-center justify-center border-2 border-dashed border-(--builder-Sidebar-border-modal) rounded-lg p-4 cursor-pointer hover:border-gray-500 transition"
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="h-28 object-cover rounded hover:cursor-pointer"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-gray-400">
                                            <Upload size={22} />
                                            <span className="text-xs">Click to upload — JPEG, PNG or WEBP</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id={`project-thumb-${project_id}`}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {errors.image && (
                                    <span className="text-xs text-red-500">{errors.image.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="mt-1 w-full bg-(--builder-edit-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-edit-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                            >
                                {isPending ? "Updating..." : "Edit Project"}
                            </button>
                        </form>

                        <div className="mt-6 border-t pt-4 flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-gray-700">Gallery Images</h3>

                            {project_images && project_images.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project_images.map((img) => (
                                        <div key={img.id} className="relative">
                                            <img
                                                src={`${BASE_URL}/uploads/${img.image_path}`}
                                                alt="Gallery"
                                                className="h-20 w-20 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => deleteImageMutation.mutate(img.id)}
                                                className="absolute -top-1 -right-1 bg-black rounded-full p-0.5 cursor-pointer"
                                            >
                                                <X size={12} color="white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => setExtraFile(e.target.files[0] || null)}
                                    className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddImage}
                                    disabled={!extraFile || uploading}
                                    className="px-3 py-1.5 bg-(--builder-edit-buttons) text-white rounded-lg text-xs font-semibold hover:bg-(--builder-edit-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                                >
                                    {uploading ? "Uploading..." : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function CreateProject({
    createModalOpen,
    setCreateModalOpen,
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    isPending,
    savedProjectId,
    setSavedProjectId,
}) {
    const slug = localStorage.getItem("slug");
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [extraFile, setExtraFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const galleryInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setValue("image", files, { shouldValidate: true });
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    async function handleAddGalleryImage() {
        if (!extraFile) return;
        setUploading(true);
        try {
            const objectUrl = URL.createObjectURL(extraFile);
            await uploadProjectImages(slug, savedProjectId, extraFile);
            setGalleryPreviews((prev) => [...prev, objectUrl]);
            setExtraFile(null);
            if (galleryInputRef.current) galleryInputRef.current.value = "";
        } catch (error) {
            alert(error.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    function handleDone() {
        setCreateModalOpen(false);
        setSavedProjectId(null);
        setGalleryPreviews([]);
        navigate(0);
    }

    return (
        <div className="py-4">
            <button
                className="flex flex-col justify-center items-center size-62.5 self-start"
                onClick={() => setCreateModalOpen(true)}
            >
                <div className="px-6 text-center">
                    <span className="text-base font-semibold text-(--builder-Sidebar-text)">
                        New project
                    </span>
                </div>
                <div className="flex justify-center items-center size-62.5 self-center shadow-[2px_2px_3_rgba(255,255,255,0.5)] bg-(--builder-SideBar) hover:cursor-pointer">
                    <Plus size={250} className="text-(--builder-buttons)" />
                </div>
            </button>

            {createModalOpen && (
                <div
                    onClick={savedProjectId ? undefined : () => setCreateModalOpen(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                >
                    <div
                        className="bg-white p-6 rounded-xl w-full max-w-md overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="flex justify-self-end hover:cursor-pointer"
                            onClick={savedProjectId ? handleDone : () => setCreateModalOpen(false)}
                        >
                            <CircleXIcon className="text-(--builder-buttons) hover:text-red-500 transition-colors" />
                        </button>

                        {savedProjectId ? (
                            <div className="flex flex-col gap-4">
                                <h2 className="text-base font-semibold text-gray-800">
                                    Project created! Add gallery images
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Upload as many project pictures as you want. Click Done when finished.
                                </p>

                                {galleryPreviews.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {galleryPreviews.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt={`Gallery ${i + 1}`}
                                                className="h-20 w-20 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <input
                                        ref={galleryInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => setExtraFile(e.target.files[0] || null)}
                                        className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddGalleryImage}
                                        disabled={!extraFile || uploading}
                                        className="px-3 py-1.5 bg-(--builder-edit-buttons) text-white rounded-lg text-xs font-semibold hover:bg-(--builder-edit-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                                    >
                                        {uploading ? "Uploading..." : "Add"}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleDone}
                                    className="w-full bg-(--builder-edit-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-edit-buttons)/50 transition cursor-pointer"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        {...register("title")}
                                        placeholder="Project title"
                                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                    />
                                    {errors.title && (
                                        <span className="text-xs text-red-500">{errors.title.message}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        placeholder="Describe your project..."
                                        rows={3}
                                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                    />
                                    {errors.description && (
                                        <span className="text-xs text-red-500">{errors.description.message}</span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Repo URL</label>
                                        <input
                                            {...register("repo_url")}
                                            placeholder="https://github.com/..."
                                            className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                        />
                                        {errors.repo_url && (
                                            <span className="text-xs text-red-500">{errors.repo_url.message}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Live URL</label>
                                        <input
                                            {...register("live_url")}
                                            placeholder="https://..."
                                            className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                        />
                                        {errors.live_url && (
                                            <span className="text-xs text-red-500">{errors.live_url.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">
                                            Display Order <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("order_index")}
                                            type="number"
                                            min={1}
                                            placeholder="1"
                                            className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                        />
                                        {errors.order_index && (
                                            <span className="text-xs text-red-500">{errors.order_index.message}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Visibility</label>
                                        <select
                                            {...register("is_public")}
                                            className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                        >
                                            <option value="1">Public</option>
                                            <option value="0">Private</option>
                                        </select>
                                        {errors.is_public && (
                                            <span className="text-xs text-red-500">{errors.is_public.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Thumbnail <span className="text-red-500">*</span>
                                    </label>
                                    <label
                                        htmlFor="project-create-thumbnail"
                                        className="flex items-center justify-center border-2 border-dashed border-(--builder-Sidebar-border-modal) rounded-lg p-4 cursor-pointer hover:border-gray-500 transition"
                                    >
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="h-28 object-cover rounded hover:cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-1 text-gray-400">
                                                <Upload size={22} />
                                                <span className="text-xs">Click to upload — JPEG, PNG or WEBP</span>
                                            </div>
                                        )}
                                    </label>
                                    <input
                                        id="project-create-thumbnail"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && (
                                        <span className="text-xs text-red-500">{errors.image.message}</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="mt-1 w-full bg-(--builder-edit-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-edit-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                                >
                                    {isPending ? "Creating..." : "Create Project"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProjectsAccordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [savedProjectId, setSavedProjectId] = useState(null);
    const slug = localStorage.getItem("slug");

    const createProjectSchema = z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(10, "Description must be at least 10 characters"),
        repo_url: z.string().optional().or(z.literal("")),
        live_url: z.string().optional().or(z.literal("")),
        is_public: z.stringbool(),
        order_index: z.coerce.number().int().min(1),
        image: z
            .instanceof(FileList)
            .refine((files) => files.length > 0, "Thumbnail is required")
            .refine(
                (files) =>
                    ["image/jpeg", "image/png", "image/webp"].includes(files[0].type),
                "Only JPEG, PNG and WEBP allowed"
            )
            .transform((files) => files[0]),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(createProjectSchema),
    });

    const uploadMutation = useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("repo_url", data.repo_url ?? "");
            formData.append("live_url", data.live_url ?? "");
            formData.append("is_public", data.is_public);
            formData.append("order_index", data.order_index);
            formData.append("image", data.image);
            return await uploadProjects(slug, formData);
        },
        onSuccess: (res) => {
            setSavedProjectId(res.data.project_id);
        },
        onError: (err) => {
            alert(err.response?.data?.error || "Something went wrong");
        },
    });

    const onSubmit = (data) => uploadMutation.mutate(data);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["projects", slug],
        queryFn: () => getProjectsBuilder(slug),
        enabled: !!slug,
    });

    if (isPending) return <div>Charging...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data) return <div>No projects</div>;

    const projects = data.data.projects.slice().sort((a, b) => a.order_index - b.order_index);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 justify-items-center place-items-center">
            <CreateProject
                createModalOpen={createModalOpen}
                setCreateModalOpen={setCreateModalOpen}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                onSubmit={onSubmit}
                isPending={uploadMutation.isPending}
                savedProjectId={savedProjectId}
                setSavedProjectId={setSavedProjectId}
            />

            {projects.map((project, index) => (
                <AccordionItem
                    key={project.id}
                    project_id={project.id}
                    project_title={project.title}
                    project_description={project.description}
                    project_thumbnail={project.thumbnail}
                    project_repo_url={project.repo_url}
                    project_live_url={project.live_url}
                    project_is_public={project.is_public}
                    project_order_index={project.order_index}
                    project_images={project.images}
                    editModalOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
    );
}
