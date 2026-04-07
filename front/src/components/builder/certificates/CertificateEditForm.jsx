import { useState } from "react";
import { BASE_URL } from "../../../api/config";
import { getCertificateBuilder, updateCertificate } from "../../../api/builder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowBigDown } from "lucide-react";
import { useNavigate } from "react-router";

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

                    <input {...register("description")} placeholder="Description" />
                    <input {...register("issuer")} placeholder="Issuer" />
                    <input {...register("issued_at")} type="date" />

                    <select {...register("type")}>
                        <option value="CERTIFICATE">Certification</option>
                        <option value="FORMATION">Formation</option>
                    </select>

                    <label>
                        <input {...register("is_public")} type="checkbox" />
                        Public
                    </label>

                    <input {...register("order_index")} type="number" />

                    <img src={`${BASE_URL}/uploads/${certificate_image_path}`} className="w-32" alt="current" />
                    <input {...register("image")} type="file" accept="image/jpeg,image/png" />
                    {errors.image && <span>{errors.image.message}</span>}

                    <button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </form>
            )}
        </div>
    )
}










export default function CertificatesAccordion() {

    const [openIndex, setOpenIndex] = useState(null);

    const slug = localStorage.getItem("slug");

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

    console.log(certificates)

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 justify-items-center">
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