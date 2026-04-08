import { useState } from "react";
import { BASE_URL } from "../../../api/config";
import { getCertificateBuilder, updateCertificate, uploadCertificates } from "../../../api/builder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import CertificateForm from "./CertificateForm";

const editCertificateSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().optional(),
    issuer: z.string().optional(),
    issued_at: z.string().optional(),
    type: z.enum(["CERTIFICATE", "FORMATION"]),
    is_public: z.boolean(),
    order_index: z.coerce.number().int().min(1),
    image: z.instanceof(FileList)
            .optional()
            .refine(
                (files) => !files || files.length === 0 || ["image/jpeg", "image/png"].includes(files[0].type), "Only JPEG and PNG allowed"
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
    isOpen, 
    onToggle

}) {

    const slug = localStorage.getItem("slug");
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(editCertificateSchema),
        defaultValues: {
            title: certificate_title ?? "",
            description: certificate_description ?? "",
            issuer: certificate_issuer ?? "",
            issued_at: certificate_issued_at ? certificate_issued_at.slice(0, 10) : "",
            type: certificate_type ?? "CERTIFICATE",
            is_public: certificate_is_public ?? true,
            order_index: certificat_order_index ?? 0,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => updateCertificate(slug, formData),
        onSuccess: () => queryClient.invalidateQueries(["certificates", slug]),
    });
    const navigate = useNavigate();

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


    return (

        <div className="py-4">
            <button
                type="button"
                aria-expanded={isOpen}
                className=""
                onClick={onToggle}
            >
                <div className="flex flex-col">
                    <div className="flex items-center justify-center px-6 text-center">
                        <span className="text-base font-semibold">
                            {certificate_title}
                        </span>
                    </div>
                    <div className="size-62.5 shrink-0 overflow-hidden bg-black/10">
                            <img
                                className="h-full w-full"
                                src={`${BASE_URL}/uploads/${certificate_image_path}`}
                                alt={`${certificate_title} Thumbnail`}
                            />
                    </div>
                    

                </div>

            </button>

            {isOpen && (
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 border flex flex-col gap-2">
                    <input {...register("title")} placeholder="Title" />
                    {errors.title && <span>{errors.title.message}</span>}

                    <div>
                        <input {...register("description")} placeholder="Description" />
                    </div>
                    <div>
                        <input {...register("issuer")} placeholder="Issuer" />
                    </div>    
                    <div>
                        <input {...register("issued_at")} type="date" />
                    </div>    
                    <div>
                        <select {...register("type")}>
                            <option value="CERTIFICATE">Certification</option>
                            <option value="FORMATION">Formation</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            <input {...register("is_public")} type="checkbox" />
                            Public
                        </label>
                    </div>
                    <div>
                        <input {...register("order_index")} type="number" />
                    </div>
                    <div className="relative w-32">
                        <img src={`${BASE_URL}/uploads/${certificate_image_path}`} className="w-32" alt="current" />
                        
                        <label htmlFor={`image-${certificate_id}`}
                            className="absolute top-1 right-1 p-1 shadow cursor-pointer bg-black rounded-4xl">
                            <Edit size={20} color="white" strokeWidth={3} />
                        </label>
                        
                        <input
                            {...register("image")}
                            id={`image-${certificate_id}`}
                            type="file"
                            accept="image/jpeg,image/png"
                            className="hidden"
                        />
                        {errors.image && <span className="text-sm text-red-500">{errors.image.message}</span>}   
                                                          
                    </div>

                    <button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </form>
            )}
        </div>
    )
}

function CreateCertificate({ createModalOpen, setCreateModalOpen, register, handleSubmit, errors, setValue, onSubmit, isPending }) {

    return (
        <>
        
        <button className="flex flex-col justify-center items-center size-62.5 self-center"
                onClick={() => setCreateModalOpen(true)}>

            <div className="px-6 text-center">
                <span className="text-base font-semibold">
                    New certificate
                </span>
            </div>
            <div className="flex justify-center items-center size-62.5 self-center border " >
                <Plus size={250}/>
            </div>
        </button>

        {createModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
                <button onClick={() => setCreateModalOpen(false)}>✕</button>
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
    </>
        
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
            is_public: z.enum(["Public", "Private"]),
            order_index: z.coerce.number()
                .min(1, "Order index must be at least 1"),
            image: z.instanceof(FileList)
                .refine(files => files.length > 0, "Image is required")
                .refine(files => ['image/jpeg', 'image/png'].includes(files[0].type), "Only JPEG and PNG allowed")
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
        <div className="grid grid-cols-1 md:grid-cols-5 justify-items-center  ">

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
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
                
            ))}
        </div>
    )
}