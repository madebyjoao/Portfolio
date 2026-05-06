import { Element, Link } from "react-scroll";
import { fontFamilies } from "@/utils/fonts";
import pic from "@/assets/logo.svg"
import { CornerLeftUp } from "lucide-react";
import ProjectTemplateThree from "../portfolio/templateThree/ProjectsTemplate3";
import { scrollToTop } from "@/utils/helpers.js"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPortfolioTemplateThree } from "../../api/portfolio";
import { BASE_URL } from "../../api/config";



export default function TemplateThree() {

    const { slug } = useParams()

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["portfolio3", slug],
        queryFn: () => getPortfolioTemplateThree(slug),
        enabled: !!slug,
    });

    if (isPending) {
        return <div>Chargement en cours...</div>;
    }

    if (isError) {
        return <div>Erreur : {error.message}</div>;
    }
    if (!data) {
        return <div>No portfolio</div>;
    }
    
    const dataTemplate3 = data.data.portfolio;
    const certificatesT3 = data.data.certificates.slice().sort((a, b) => a.order_index - b.order_index);
    const projectsT3 = data.data.projects.slice().sort((a, b) => a.order_index - b.order_index);
    const mainFont = fontFamilies[dataTemplate3.font_main];
    const techs = data.data.portfolio.technologies;
    
    console.log(dataTemplate3);
    console.log(certificatesT3);
    console.log(projectsT3);
    
    



    return (
        <div 
            style={{ fontFamily: mainFont }}
            className="relative grid grid-cols-1 grid-rows-3 gap-x-4 gap-y-4 h-full text-(--template-three-text-title) mt-5">

            <Link 
                onClick={scrollToTop}
                to=""
                smooth={true} 
                duration={500} 
                offset={-70}
                className="absolute z-90 size-auto bottom-6 right-6 bg-amber-950 p-2.5 rounded-xl"
            >
                <CornerLeftUp color="white"/>
            </Link>

            <Element 
                name="about"
                className="">

                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-3 h-full w-full p-2">

                    <div className="grid row-span-3 content-center w-full h-full">
                        <img 
                            src={pic} 
                            alt="profil picture" 
                            className="h-65"
                        />
                    </div>
                    <div className="col-start-2 place-content-center">
                        <h2 className="text-5xl tracking-widest">
                            {dataTemplate3.full_name}
                        </h2>
                    </div>
                    <div className="col-start-2 row-start-2">
                       <div className="flex flex-col gap-2 justify-start items-start">
                            <p className="tracking-widest">
                                {dataTemplate3.position}<span className="pr-2 pl-1">·</span>{dataTemplate3.region}
                            </p>
                            <div className="flex gap-2 justify-center items-center">
                                {techs.map((tech, index) => (
                                    <p 
                                        key={index}
                                        className="border-2 border-(--border-template-three) rounded-full px-4 py-1 "
                                    >{tech}</p>
                                ))}
                            </div>
                       </div>
                    </div>
                    <div className="col-start-2 row-start-3 border-2 border-(--border-template-three) rounded-xl mr-2">
                        <p className="p-4">
                            {dataTemplate3.about_text}
                        </p>
                    </div>
            
                </div>

            </Element>
            <Element 
                name="projects"
                className="row-start-2">

                <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2 h-full w-full p-2">
                    <div className="text-4xl tracking-widest">
                        <h2>Projects</h2>
                    </div>

                    <div className="row-start-2">
                        {projectsT3.map((project) => {
                            const images = project.images.slice().sort((a, b) => a.order_index - b.order_index);
                            return (
                                <ProjectTemplateThree 
                                    thumbnail={`${BASE_URL}/uploads/${project.thumbnail}`}
                                />
                            );
                        })}
                    </div>

                </div>

            </Element>
            <Element 
                name="certificates"
                className="row-start-3">

                <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2 h-full w-full p-2">
                    <div className="text-4xl tracking-widest">
                        <h2>Certificates</h2>
                    </div>
                    <div className="bg-yellow-500 row-start-2">

                    </div>

                </div>

            </Element>

        </div>
    )
}