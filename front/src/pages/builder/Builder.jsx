import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getPortfolioBuilder, updatePortfolio } from "../../api/builder";
import { fonts } from "../../utils/fonts";

const fontValues = fonts.map(f => f.value);

const editPortfolioSchema = z.object({
    title: z.string().min(1, "title is required"),
    about_title: z.string().min(1, "About title is required"),
    about_text: z.string().min(1, "About You text is required"),
    is_published: z.stringbool(),
    template: z.enum(["1", "2"]).transform(Number),
    font_navbar: z.enum(fontValues),
    font_main:   z.enum(fontValues),
    font_footer: z.enum(fontValues),
    file: z.instanceof(FileList)
            .optional()
            .refine(
                (files) => !files || files.length === 0 || ["application/pdf"].includes(files[0].type), "Only PDF files allowed"
            )
            .transform((files) => (files && files.length > 0 ? files[0] : undefined)),
    });

function Builder() {

    const slug = localStorage.getItem("slug");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["builder-portfolio", slug],
        queryFn: () => getPortfolioBuilder(slug),
        enabled: !!slug,
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(editPortfolioSchema),
    });

    const { mutate } = useMutation({
        mutationFn: (formData) => updatePortfolio(slug, formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["builder-portfolio", slug]);
            navigate(0);
        },
    });

    useEffect(() => {
        if (data?.data?.portfolio) {
            const p = data.data.portfolio;
            reset({
                title: p.title ?? "",
                about_title: p.about_title ?? "",
                about_text: p.about_text ?? "",
                is_published: p.is_published ? "1" : "0",
                template: String(p.template ?? 1),
                font_navbar: p.font_navbar ?? fonts[0].value,
                font_main:   p.font_main ?? fonts[0].value,
                font_footer: p.font_footer ?? fonts[0].value,
            });
        }
    }, [data]);

    if (isPending) {
        return <div>Charging...</div>;
    }

    if (isError) {
        return <div>Erreur : {error.message}</div>;
    }
    if (!data) {
        return <div>No portfolio</div>;
    }

    const portfolio = data.data.portfolio;



    /* DeleteMutation not sure how im gonna handle this yet ask Sambeau for ideas.... */

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("id", portfolio.id);
        formData.append("title", data.title);
        formData.append("about_title", data.about_title);
        formData.append("about_text", data.about_text);
        formData.append("is_published", data.is_published ? "1" : "0");
        formData.append("template", data.template);
        formData.append("font_navbar", data.font_navbar);
        formData.append("font_main", data.font_main);
        formData.append("font_footer", data.font_footer);
        if (data.file) formData.append("file", data.file);
        mutate(formData);

    }

    return (

        <div className="flex flex-col border rounded-md p-6 max-h-full h-full">

            <h1 className="text-white">This is the Dashboard</h1>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <div className="flex gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="">
                                Select your template
                            </label>
                            <select {...register("template")}>
                                <option value="1">Template 1</option>
                                <option value="2">Template 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">
                                Ready to show your Portfolio to the world?
                            </label>

                            <select {...register("is_published")}>

                                <option value="1">Yes, I'm ready</option>
                                <option value="0">No, i'm shy</option>

                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">

                        <h2>Select your Font families here:</h2>

                        <div className="flex gap-5">

                            <div className="flex flex-col">

                                <select {...register("font_navbar")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                </select>

                            </div>

                            <div className="flex flex-col">
                                <select {...register("font_main")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <select {...register("font_footer")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>



                    <div className="flex flex-col">

                        <label htmlFor="title">
                            Portfolio Name
                        </label>

                        <input id="title" type="text" {...register("title")} />

                    </div>
                    <div className="flex flex-col">

                        <label htmlFor="about_title">
                            Title
                        </label>

                        <input id="about_title" type="text" {...register("about_title")} />

                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="about_text">
                            About you
                        </label>

                        <input id="about_text" type="text" {...register("about_text")} />

                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="file">
                            Upload your CV
                        </label>

                        <input id="file" type="file" accept=".pdf" {...register("file")} />

                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="">
                            something
                        </label>

                        <input type="text" />

                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-1 w-full bg-(--builder-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                    >
                        {isPending ? "Updating..." : "Save Changes"}
                    </button>


                </form>
            </div>

        </div>

    );
}

export default Builder;