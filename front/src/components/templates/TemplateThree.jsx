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
import CertificatesTemplateThree from "../portfolio/templateThree/CertificatesTemplate3";



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
    
    console.log("portfolio", dataTemplate3);
    console.log("ceetifs", certificatesT3);
    console.log("projects", projectsT3);
    
    



    return (
        <div 
            style={{ fontFamily: mainFont }}
            className="relative grid grid-cols-1 grid-rows-[auto_auto_auto] gap-x-4 gap-y-15 h-full text-(--template-three-text-title) mt-5 px-20">

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

            {/* Header Informations */}
            <Element 
                name="about"
            >

                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-3 h-full w-full py-2">

                    <div className="grid row-span-3 content-center min-h-70 min-w-70 w-full h-full">
                        <img 
                            src={`${BASE_URL}/uploads/${dataTemplate3.picture_path}`} 
                            alt="profil picture" 
                            className="h-full w-full"
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
                    <div className="col-start-2 row-start-3 border-2 border-(--border-template-three) rounded-xl">
                        <p className="p-4">
                            {dataTemplate3.about_text}
                        </p>
                    </div>
            
                </div>

            </Element>

             {/* Projects*/}
            <Element 
                name="projects"
                className="row-start-2">

                <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-4 h-full w-full">
                    <div className="text-4xl tracking-widest">
                        <h2>Projects</h2>
                    </div>

                    <div className="grid row-start-2 border-2 border-(--border-template-three) rounded-xl p-5 gap-5">

                            {projectsT3.map((project) => {
                                const images = project.images.slice().sort((a, b) => a.order_index - b.order_index);
                                return (
                                    <ProjectTemplateThree 
                                        key={project.order_index}
                                        thumbnail={`${BASE_URL}/uploads/${project.thumbnail}`}
                                        title={project.title}
                                        description={project.description}
                                        github={project.repo_url}
                                        technologies={project.technologies}
                                        website={project.live_url}
                                        images={project.images}
                                    />
                                    
                                );
                            })}

                    </div>

                </div>

            </Element>

             {/* Certificates */}
            <Element 
                name="certificates"
                className="row-start-3">

                <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-4 h-full w-full">
                    <div className="text-4xl tracking-widest">
                        <h2>Certificates</h2>
                    </div>
                    <div className="row-start-2 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center border-2 border-(--border-template-three) rounded-xl p-5 gap-5 mb-10">
                            
                        {certificatesT3.map( (certificate) => {                          
                            return (
                                <CertificatesTemplateThree 
                                    key={certificate.order_index}
                                    title={certificate.title}
                                    description={certificate.description}
                                    thumbnail={certificate.image_path}
                                    type={certificate.type}
                                    issuer={certificate.issuer}
                                />
                        )})
                            
                                
                        }    
                    </div>

                </div>

            </Element>

        </div>
    )
}