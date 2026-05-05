import { useState } from "react";
import { BASE_URL } from "../../../api/config";
import { deleteCertificate, getCertificateBuilder, updateCertificate, uploadCertificates } from "../../../api/builder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleX, CircleXIcon, Edit, Plus, Trash, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import CertificateForm from "./CertificateForm";

const editCertificateSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().optional(),
    issuer: z.string().optional(),
    issued_at: z.string().optional(),
    type: z.enum(["CERTIFICATE", "FORMATION"]),
    is_public: z.stringbool(),
    order_index: z.coerce.number().int().min(1),
    image: z.instanceof(FileList)
            .optional()
            .refine(
                (files) => !files || files.length === 0 || ["image/jpeg", "image/png", "image/webp"].includes(files[0].type), "Only JPEG, PNG and WEBP allowed"
            )
            .transform((files) => (files && files.length > 0 ? files[0] : undefined)),

            });


function AccordionItem({
    certificate_id,
    certificate_title,
    certificate_description,
    certificate_issued_at,
    certificate_issuer,
    certificate_type,
    certificate_is_public,
    certificate_image_path,
    certificat_order_index,
    editModalOpen,
    onToggle

}) {

    const slug = localStorage.getItem("slug");
    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(editCertificateSchema),
        defaultValues: {
            title: certificate_title ?? "",
            description: certificate_description ?? "",
            issuer: certificate_issuer ?? "",
            issued_at: certificate_issued_at ? certificate_issued_at.slice(0, 10) : "",
            type: certificate_type ?? "CERTIFICATE",
            is_public: certificate_is_public ? "1" : "0",
            order_index: certificat_order_index ?? 1,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => updateCertificate(slug, formData),
        onSuccess: () => queryClient.invalidateQueries(["certificates", slug]),
    });
    const navigate = useNavigate();

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
        return await deleteCertificate(id);
        },
        onSuccess: (data, variables, context) => {
        window.location.reload();
        },
    });

    function handleDelete(id) {
        if (confirm("You sure you want to delete this certificate?")) {
        deleteMutation.mutate(id);
        }
    }

    

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("id", certificate_id);
        formData.append("title", data.title);
        formData.append("description", data.description ?? "");
        formData.append("issuer", data.issuer ?? "");
        formData.append("issued_at", data.issued_at ?? "");
        formData.append("type", data.type);
        formData.append("is_public", data.is_public);
        formData.append("order_index", data.order_index);
        if (data.image) formData.append("image", data.image);
        mutate(formData);
        navigate(0);
        
    };
    const [preview, setPreview] = useState(certificate_image_path ? `${BASE_URL}/uploads/${certificate_image_path}` : null);

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
                            {certificate_title}
                        </span>
                    </div>
                    <div className="relative size-62.5 shrink-0 overflow-hidden bg-black/10">
                        <img
                            className="h-full w-full"
                            src={`${BASE_URL}/uploads/${certificate_image_path}`}
                            alt={`${certificate_title} Thumbnail`}
                        />
                    </div>
                </button>

                <button
                    type='button'
                    aria-label='Delete certificate'
                    onClick={(e) => { e.stopPropagation(); handleDelete(certificate_id); }}
                    className="absolute self-end top-10 right-5 cursor-pointer bg-black rounded-full p-1"
                >
                    <CircleX color="white"/>
                </button>
            </div>

            
                {editModalOpen && (
                <div
                    onClick={onToggle}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <button className="flex justify-self-end hover:cursor-pointer" onClick={onToggle}><CircleXIcon className="text-(--builder-edit-buttons) hover:text-red-500 transition-colors"/></button>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700">Title <span className="text-red-500">*</span></label>
                                <input
                                    {...register("title")}
                                    placeholder="Title"
                                    className="border border-(--builder-Sidebar-border-modal) rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                                />
                                {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Issuer <span className="text-red-500">*</span></label>
                                    <input
                                        {...register("issuer")}
                                        placeholder="issuer"
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
                                        <img src={preview} alt="Preview" className="h-28 object-cover rounded hover:cursor-pointer" />
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
                                className="mt-1 w-full bg-(--builder-edit-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-edit-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                            >
                                {isPending ? "Updating..." : "Edit Certificate"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
                
            
        </div>
    )
}

function CreateCertificate({ createModalOpen, setCreateModalOpen, register, handleSubmit, errors, setValue, onSubmit, isPending }) {

    return (
        <div className="py-4">
        
            <button className="flex flex-col justify-center items-center size-62.5 self-start "
                    onClick={() => setCreateModalOpen(true)}>
                
                <div className="px-6 text-center">
                    <span className="text-base font-semibold text-(--builder-Sidebar-text)">
                        New certificate
                    </span>
                </div>
                <div className="flex justify-center items-center size-62.5 self-center shadow-[2px_2px_3_rgba(255,255,255,0.5)] bg-(--builder-SideBar) hover:cursor-pointer  " >
                    <Plus size={250} className="text-(--builder-buttons)"/>
                </div>
            </button>

                {createModalOpen && (
                <div 
                    onClick={() => setCreateModalOpen(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <button className="flex justify-self-end hover:cursor-pointer" onClick={() => setCreateModalOpen(false)}><CircleXIcon className="text-(--builder-buttons) hover:text-red-500 transition-colors"/></button>
                        <CertificateForm
                            register={register}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            setValue={setValue}
                            onSubmit={onSubmit}
                            isPending={isPending}
                        />
                    </div>
                </div>
            )}
        </div>
        
    )
}








export default function CertificatesAccordion() {

    const [openIndex, setOpenIndex] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const slug = localStorage.getItem("slug");
    
    const certificateSchema = z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string().min(10, "Description must be at least 10 characters"),
            issuer: z.string().min(1, "Issuer is required"),
            issued_at: z.string().min(1, "Issuer is required"),
            type: z.enum(["CERTIFICATE", "FORMATION"]),
            is_public: z.stringbool(),
            order_index: z.coerce.number()
                .min(1, "Order index must be at least 1"),
            image: z.instanceof(FileList)
                .refine(files => files.length > 0, "Image is required")
                .refine(files => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type), "Only JPEG, PNG and WEBP allowed")
                .transform(files => files[0]),
    
        });
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
            resolver: zodResolver(certificateSchema),
    }); 

    const uploadMutation  = useMutation({
            mutationFn: async (data) => {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("issuer", data.issuer);
                formData.append("issued_at", data.issued_at);
                formData.append("type", data.type);
                formData.append("is_public", data.is_public);
                formData.append("order_index", data.order_index);
                formData.append("image", data.image);
                return await uploadCertificates(slug, formData);
            },
        onSuccess: (res) => {
            alert(res.data.message);
            setCreateModalOpen(false)
            navigate(0);
        },
        onError: (err) => {
            alert(err.response?.data?.error || "Something went wrong");
        },
    });

    const onSubmit = (data) => uploadMutation.mutate(data);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["certificates", slug],
        queryFn: () => getCertificateBuilder(slug),
        enabled: !!slug,
    });

    if (isPending) {
        return <div>Charging...</div>;
    }

    if (isError) {
        return <div>Erreur : {error.message}</div>;
    }
    if (!data) {
        return <div>No certificates</div>;
    }
    const certificates = data.data.certificates;


    return (
        <div className="grid grid-cols-1 md:grid-cols-5 justify-items-center place-items-center">

            <CreateCertificate
                createModalOpen={createModalOpen}
                setCreateModalOpen={setCreateModalOpen}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                onSubmit={onSubmit}
                isPending={uploadMutation.isPending}
            />

            {certificates.map((certificate, index) => (
                <AccordionItem 
                    key={certificate.order_index}
                    certificate_id={certificate.id}
                    certificate_title={certificate.title}
                    certificate_description={certificate.description}
                    certificate_issued_at={certificate.issued_at}
                    certificate_issuer={certificate.issuer}
                    certificate_type={certificate.type}
                    certificate_is_public={certificate.is_public}
                    certificate_image_path={certificate.image_path}
                    certificat_order_index={certificate.order_index}
                    editModalOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
                
            ))}
        </div>
    )
}