import { uploadCertificates } from "@/api/builder";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CertificateForm from "@/components/builder/certificates/CertificateForm";




export default function BuilderCertificates() { 

    const slug = localStorage.getItem("slug");
    
    const certificateSchema = z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string().min(10, "Description must be at least 10 characters"),
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
                formData.append("image", data.image);
                return await uploadCertificates(slug, formData);
            },
        onSuccess: (res) => {
            alert(res.data.message);
            navigate(0);
        },
        onError: (err) => {
            alert(err.response?.data?.error || "Something went wrong");
        },
    });

    const onSubmit = (data) => uploadMutation.mutate(data);

    return (
        <CertificateForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            onSubmit={onSubmit}
            isPending={uploadMutation.isPending}
        />
    )

}

