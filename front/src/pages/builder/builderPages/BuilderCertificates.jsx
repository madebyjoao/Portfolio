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
            navigate();
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
    



{/* 
    import { useState } from "react";
    import { uploadCertificates } from "../../../api/builder";
    
    export default function BuilderCertificates() {
        const [file, setFile] = useState(null);
       
        const [title, setTitle] = useState("");
        const [info, setInfo] = useState("");
        
        const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !title || !info) {
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

        try {
            await uploadCertificates(slug, formData);
            alert("Upload successful!");
        } catch (error) {
            console.error("Upload failed:", error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Upload failed";
            alert(`Upload failed: ${errorMessage}`);
        }
    };

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-[rgb(24,61,61)]">
                    Portfolio Builder
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="certificate-image-upload"
                            className="block mb-2"
                        >
                            Upload Certificate Image
                        </label>
                        <input
                            id="certificate-image-upload"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="certificate-title-upload"
                            className="block mb-2"
                        >
                            Certificate Title
                        </label>
                        <input
                            id="certificate-title-upload"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="certificate-info-upload"
                            className="block mb-2"
                        >
                            Certificate Information
                        </label>
                        <input
                            id="certificate-info-upload"
                            type="text"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Upload Certificate
                    </button>
                </form>
            </div>
        </section>
    );
}
 */}