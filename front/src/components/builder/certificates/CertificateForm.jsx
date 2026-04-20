import { useState } from "react";
import { Upload } from "lucide-react";

export default function CertificateForm({ register, handleSubmit, errors, setValue, onSubmit, isPending }) {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setValue("image", files, { shouldValidate: true });
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Title <span className="text-red-500">*</span></label>
                <input
                    {...register("title")}
                    placeholder="e.g. Angular"
                    className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
                {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Issuer <span className="text-red-500">*</span></label>
                    <input
                        {...register("issuer")}
                        placeholder="e.g. Codecademy"
                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                    {errors.issuer && <span className="text-xs text-red-500">{errors.issuer.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Issued At <span className="text-red-500">*</span></label>
                    <input
                        {...register("issued_at")}
                        type="date"
                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                    {errors.issued_at && <span className="text-xs text-red-500">{errors.issued_at.message}</span>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Type</label>
                    <select
                        {...register("type")}
                        className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    >
                        <option value="CERTIFICATE">Certificate</option>
                        <option value="FORMATION">Formation</option>
                    </select>
                    {errors.type && <span className="text-xs text-red-500">{errors.type.message}</span>}
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
                    {errors.is_public && <span className="text-xs text-red-500">{errors.is_public.message}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
                <textarea
                    {...register("description")}
                    placeholder="Briefly describe what this certificate covers..."
                    rows={3}
                    className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
                {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Display Order <span className="text-red-500">*</span></label>
                <input
                    {...register("order_index")}
                    type="number"
                    min={1}
                    placeholder="1"
                    className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
                {errors.order_index && <span className="text-xs text-red-500">{errors.order_index.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Certificate Image <span className="text-red-500">*</span></label>
                <label
                    htmlFor="cert-image-upload"
                    className="flex items-center justify-center border-2 border-dashed border-(--builder-Sidebar-border-modal) rounded-lg p-4 cursor-pointer hover:border-gray-500 transition"
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="h-28 object-cover rounded" />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-gray-400">
                            <Upload size={22} />
                            <span className="text-xs">Click to upload — JPEG, PNG or WEBP</span>
                        </div>
                    )}
                </label>
                <input
                    id="cert-image-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                />
                {errors.image && <span className="text-xs text-red-500">{errors.image.message}</span>}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="mt-1 w-full bg-(--builder-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-buttons)/50 disabled:opacity-50 transition cursor-pointer"
            >
                {isPending ? "Uploading..." : "Create Certificate"}
            </button>
        </form>
    );
}
