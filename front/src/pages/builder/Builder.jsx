import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { getPortfolioBuilder, updatePortfolio } from "../../api/builder";
import { fonts, fontFamilies } from "../../utils/fonts";
import Styles from "@/index.module.css"

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

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
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

    const [font_navbar, font_main, font_footer] = watch(["font_navbar", "font_main", "font_footer"]);

    return (        
     
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-6 grid-rows-[auto_1fr_1fr_auto_auto] gap-x-4 gap-y-4 max-h-screen h-full">

                    <div className="col-span-3">
                        <div className="grid grid-cols-1 grid-rows-2 gap-2 h-full  p-2">
                            <h2 className="text-lg font-semibold" >
                                Select your template
                            </h2>
                            <select 
                                {...register("template")}
                                className="row-start-2 max-w-1/2 w-fit hover:cursor-pointer">
                                
                                <option value="1">Template 1</option>
                                <option value="2">Template 2</option>

                            </select> 
                        </div>
                    </div>

                    <div className="col-start-4 col-span-3">
                        <div className="grid grid-cols-1 grid-rows-2 gap-2 h-full w-full p-2">
                            <h2 className="text-lg font-semibold" >
                                Ready to show your Portfolio to the world?
                            </h2>
                            <select 
                                className="row-start-2 max-w-1/2 w-fit hover:cursor-pointer" 
                                {...register("is_published")}>

                                <option value="1">Yes, I'm ready</option>
                                <option value="0">No, i'm shy</option>

                            </select>

                        </div>
                    </div>

                    <div className="row-start-2 col-span-2">
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full w-full p-2">
                            <h2 className="col-span-2 flex items-center justify-center bg-gray-400/90 text-3xl font-semibold outline outline-none rounded-lg px-3 py-2 box-border">
                                Nav bar
                            </h2>
                            <select className="bg-rose-500 row-start-2 hover:cursor-pointer"
                                {...register("font_navbar")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                            <div 
                                className="bg-yellow-500 col-start-2 row-start-2"
                                style={{ fontFamily: fontFamilies[font_navbar] || fontFamilies.abeezee, fontSize: '18px', padding: '10px' }}
                                >
                                    A Preview of the Font you are selecting, <br/> Have FUN!!!!

                            </div>
                        </div>
                    </div>

                    <div className="col-start-3 row-start-2 col-span-2">
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full w-full p-2">
                            <h2 className="col-span-2 flex items-center justify-center bg-gray-400/90 text-3xl font-semibold outline outline-none rounded-lg px-3 py-2 box-border">
                                Main
                            </h2>
                            <select 
                                className="bg-rose-500 row-start-2 hover:cursor-pointer" 
                                {...register("font_main")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                            <div 
                                className="bg-orange-500 col-start-2 row-start-2"
                                style={{ fontFamily: fontFamilies[font_main] || fontFamilies.abeezee, fontSize: '18px', padding: '10px' }}
                                >
                                    A Preview of the Font you are selecting, <br/> Have FUN!!!!

                            </div>
                        </div>
                    </div>

                    <div className="col-start-5 row-start-2 col-span-2">
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full w-full p-2">
                            <h2 className="col-span-2 flex items-center justify-center bg-gray-400/90 text-3xl font-semibold outline outline-none rounded-lg px-3 py-2 box-border">
                                Footer
                            </h2>
                            <select className="bg-green-500 row-start-2 hover:cursor-pointer"
                                {...register("font_footer")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                            <div className="bg-teal-500 col-start-2 row-start-2"
                                style={{ fontFamily: fontFamilies[font_footer] || fontFamilies.abeezee, fontSize: '18px', padding: '10px' }}
                                >
                                    A Preview of the Font you are selecting, <br/> Have FUN!!!!

                            </div>
                        </div>
                    </div>

                    <div className="row-start-3 col-span-2">
                        <div className="grid grid-cols-1 grid-rows-[auto_0.7fr] gap-5 h-full w-full p-5">
                            <h2 className="flex items-center justify-center bg-gray-400/90 text-3xl font-semibold outline outline-none rounded-lg px-3 py-2 box-border">
                                Portfolio Name
                            </h2>
                            <input 
                                className="row-start-2 border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-md focus:outline-none focus:ring-4 focus:ring-(--builder-dashboard-border-inputs) transition" 
                                id="title" type="text" {...register("title")} />
                        </div>
                    </div>

                    <div className="col-start-3 row-start-3 col-span-2">
                        <div className="grid grid-cols-1 grid-rows-[auto_0.7fr] gap-5 h-full w-full p-5">
                            <h2 className="flex items-center justify-center bg-gray-400/90 text-3xl font-semibold outline outline-none rounded-lg px-3 py-2 box-border">
                                Title
                            </h2>
                            <input 
                                placeholder=""
                                className="row-start-2 border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-md focus:outline-none focus:ring-4 focus:ring-(--builder-dashboard-border-inputs) transition"
                                id="about_title" type="text" {...register("about_title")} 
                            />
                        </div>
                    </div>

                    <div className="col-start-5 row-start-3 col-span-2">
                        <div className="grid grid-cols-1 grid-rows-[auto_0.7fr] gap-5 h-full w-full p-5">
                            <h2 className="flex items-center justify-center bg-gray-400/90 text-3xl font-semibold outline outline-none rounded-lg px-3 py-2 box-border">
                                About You
                            </h2>
                            <textarea 
                                className="row-start-2 border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-md focus:outline-none focus:ring-4 focus:ring-(--builder-dashboard-border-inputs) transition" 
                                id="about_text" {...register("about_text")}
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-start-3 row-start-4 col-span-2">
                        <div className="grid grid-cols-1 grid-rows-2 gap-2 h-full w-full p-2">
                            <h2 className="flex items-center justify-center">
                                Upload you CV
                            </h2>
                            <input 
                                placeholder="Upload your CV"
                                className="row-start-2 text-center hover:cursor-pointer border-2 border-dashed border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-md" 
                                id="file" type="file" accept=".pdf" {...register("file")}
                            />
                        </div>
                    </div>

                    <button className="col-start-2 row-start-5 col-span-4 mt-1 w-full bg-(--builder-buttons) text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-(--builder-buttons)/50 disabled:opacity-50 transition cursor-pointer"
                    >
                        {isPending ? "Updating..." : "Save Changes"}
                    </button>
                </form>

    );
}

export default Builder;