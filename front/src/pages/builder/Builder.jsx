import { useEffect, useState } from "react";
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

    const [font_navbar, font_main, font_footer] = watch(["font_navbar", "font_main", "font_footer"]);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setSelectedFile(file.name);
        } else {
        setSelectedFile(null);
        }
    };

    return (        
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-6 grid-rows-[auto_1fr_1fr_1fr_auto] gap-4 max-h-screen h-full p-4">

                    {/* Template Selection */}
                    <div className="col-span-3 bg-white/90 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-4 h-full">
                            <h2 className="text-2xl font-bold text-(--builder-SideBar)">
                                Select your template
                            </h2>
                            <select 
                                {...register("template")}
                                className="bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-4 py-3 text-base font-medium hover:border-(--builder-buttons) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) transition cursor-pointer">
                                <option value="1">Template 1</option>
                                <option value="2">Template 2</option>
                            </select> 
                        </div>
                    </div>

                    {/* Publish Status */}
                    <div className="col-start-4 col-span-3 bg-white/90 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-4 h-full">
                            <h2 className="text-2xl font-bold text-(--builder-SideBar)">
                                Ready to show your Portfolio to the world?
                            </h2>
                            <select 
                                className="bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-4 py-3 text-base font-medium hover:border-(--builder-buttons) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) transition cursor-pointer" 
                                {...register("is_published")}>
                                <option value="1">Yes, I'm ready</option>
                                <option value="0">No, I'm shy</option>
                            </select>
                        </div>
                    </div>

                    {/* Navbar Font */}
                    <div className="row-start-2 col-span-2 bg-white/90 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-3 h-full">
                            <h3 className="text-xl font-bold text-center text-(--builder-SideBar) bg-(--builder-buttons)/20 rounded-lg py-2">
                                Navbar Font
                            </h3>
                            <select 
                                className="bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-sm font-medium hover:border-(--builder-buttons) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) transition cursor-pointer"
                                {...register("font_navbar")}>
                                {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                            <div 
                                className="flex-1 bg-gradient-to-br from-(--builder-buttons)/30 to-(--builder-buttons)/10 border border-(--builder-dashboard-border-inputs) rounded-lg p-3 flex items-center justify-center text-center"
                                style={{ fontFamily: fontFamilies[font_navbar] || fontFamilies.abeezee, fontSize: '16px' }}>
                                <p className="text-(--builder-SideBar) leading-relaxed">
                                    A Preview of the Font you are selecting, Have FUN!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Font */}
                    <div className="col-start-3 row-start-2 col-span-2 bg-white/90 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-3 h-full">
                            <h3 className="text-xl font-bold text-center text-(--builder-SideBar) bg-(--builder-buttons)/20 rounded-lg py-2">
                                Main Font
                            </h3>
                            <select 
                                className="bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-sm font-medium hover:border-(--builder-buttons) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) transition cursor-pointer"
                                {...register("font_main")}>
                                {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                            <div 
                                className="flex-1 bg-gradient-to-br from-(--builder-buttons)/30 to-(--builder-buttons)/10 border border-(--builder-dashboard-border-inputs) rounded-lg p-3 flex items-center justify-center text-center"
                                style={{ fontFamily: fontFamilies[font_main] || fontFamilies.abeezee, fontSize: '16px' }}>
                                <p className="text-(--builder-SideBar) leading-relaxed">
                                    A Preview of the Font you are selecting, Have FUN!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Font */}
                    <div className="col-start-5 row-start-2 col-span-2 bg-white/90 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-3 h-full">
                            <h3 className="text-xl font-bold text-center text-(--builder-SideBar) bg-(--builder-buttons)/20 rounded-lg py-2">
                                Footer Font
                            </h3>
                            <select 
                                className="bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-3 py-2 text-sm font-medium hover:border-(--builder-buttons) focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) transition cursor-pointer"
                                {...register("font_footer")}>
                                {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                            <div 
                                className="flex-1 bg-gradient-to-br from-(--builder-buttons)/30 to-(--builder-buttons)/10 border border-(--builder-dashboard-border-inputs) rounded-lg p-3 flex items-center justify-center text-center"
                                style={{ fontFamily: fontFamilies[font_footer] || fontFamilies.abeezee, fontSize: '16px' }}>
                                <p className="text-(--builder-SideBar) leading-relaxed">
                                    A Preview of the Font you are selecting, Have FUN!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Name */}
                    <div className="row-start-3 col-span-2 bg-white/90 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-4 h-full">
                            <h3 className="text-xl font-bold text-(--builder-SideBar) bg-(--builder-buttons)/20 rounded-lg py-2 px-3 text-center">
                                Portfolio Name
                            </h3>
                            <input 
                                className="flex-1 bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) focus:border-(--builder-buttons) transition placeholder:text-gray-400" 
                                id="title" 
                                type="text" 
                                placeholder="Enter your portfolio name"
                                {...register("title")} 
                            />
                        </div>
                    </div>

                    {/* About Title */}
                    <div className="col-start-3 row-start-3 col-span-2 bg-white/90 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-4 h-full">
                            <h3 className="text-xl font-bold text-(--builder-SideBar) bg-(--builder-buttons)/20 rounded-lg py-2 px-3 text-center">
                                About Title
                            </h3>
                            <input 
                                className="flex-1 bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) focus:border-(--builder-buttons) transition placeholder:text-gray-400"
                                id="about_title" 
                                type="text" 
                                placeholder="e.g., About Me"
                                {...register("about_title")} 
                            />
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="col-start-5 row-start-3 col-span-2 bg-white/90 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-4 h-full">
                            <h3 className="text-xl font-bold text-(--builder-SideBar) bg-(--builder-buttons)/20 rounded-lg py-2 px-3 text-center">
                                About You
                            </h3>
                            <textarea 
                                className="flex-1 bg-white border-2 border-(--builder-dashboard-border-inputs) rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-(--builder-buttons) focus:border-(--builder-buttons) transition resize-none placeholder:text-gray-400" 
                                id="about_text" 
                                placeholder="Tell the world about yourself..."
                                {...register("about_text")}
                            ></textarea>
                        </div>
                    </div>

                    {/* CV Upload */}
                    <div className="col-start-3 row-start-4 col-span-2 bg-white/90 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-4 h-full">
                            <h3 className="text-xl font-bold text-(--builder-SideBar) text-center">Upload your CV</h3>
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-(--builder-dashboard-border-inputs) rounded-lg hover:border-(--builder-buttons) hover:bg-(--builder-buttons)/5 transition cursor-pointer group">
                                <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                                    <svg className="w-10 h-10 mb-3 text-(--builder-buttons) group-hover:scale-110 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-(--builder-SideBar)">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-base font-medium text-(--builder-buttons)">
                                        {selectedFile ? selectedFile : 'Your CV (.pdf)'}
                                    </p>
                                </div>
                                <input 
                                    id="dropzone-file" 
                                    type="file" 
                                    className="hidden" 
                                    accept=".pdf" 
                                    {...register("file")} 
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>                        
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="col-start-2 row-start-5 col-span-4 bg-(--builder-buttons) text-white py-4 rounded-xl text-lg font-bold hover:bg-(--builder-SideBar) disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        {isPending ? "Updating..." : "Save Changes"}
                    </button>
                </form>
    );
}

export default Builder;
