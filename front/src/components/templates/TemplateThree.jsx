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
            className="relative grid grid-cols-1 gap-4 lg:gap-y-8 h-full text-(--template-three-text-title) mt-5 px-4 lg:px-20">

            <Link 
                onClick={scrollToTop}
                to=""
                smooth={true} 
                duration={500} 
                offset={-70}
                className="absolute z-900 bottom-4 right-4 lg:bottom-6 lg:right-6 bg-amber-950 p-2 lg:p-2.5 rounded-xl hover:cursor-pointer hover:bg-amber-900 transition shadow-lg"
            >
                <CornerLeftUp className="w-5 h-5 lg:w-6 lg:h-6" color="white"/>
            </Link>

            {/* Header Informations */}
            <Element 
                name="about"
            >

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,auto)_1fr] gap-4 lg:gap-6 w-full py-2">

                    {/* Profile Picture - Full width on mobile, fixed on desktop */}
                    <div className="flex items-center justify-center lg:row-span-3">
                        <img 
                            src={`${BASE_URL}/uploads/${dataTemplate3.picture_path}`} 
                            alt="profil picture" 
                            className="w-full max-w-75 max-h-75 lg:w-full h-auto object-cover rounded-lg lg:rounded-none"
                        />
                    </div>

                    {/* Name */}
                    <div className="flex items-center justify-center lg:justify-start">
                        <h2 className="text-3xl lg:text-5xl tracking-widest text-center lg:text-left">
                            {dataTemplate3.full_name}
                        </h2>
                    </div>

                    {/* Position, Region & Technologies */}
                    <div className="flex flex-col gap-3 items-center lg:items-start">
                        <p className="tracking-widest text-center lg:text-left">
                            {dataTemplate3.position}<span className="px-2">·</span>{dataTemplate3.region}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {techs.map((tech, index) => (
                                <p 
                                    key={index}
                                    className="border-2 border-(--border-template-three) rounded-full px-3 py-1 text-sm lg:text-base"
                                >{tech}</p>
                            ))}
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="border-2 border-(--border-template-three) rounded-xl lg:col-start-2">
                        <p className="p-4 text-sm lg:text-base leading-relaxed">
                            {dataTemplate3.about_text}
                        </p>
                    </div>
            
                </div>

            </Element>

             {/* Projects*/}
            <Element 
                name="projects"
            >

                <div className="grid grid-cols-1 gap-4 h-full w-full">
                    <div className="text-2xl lg:text-4xl tracking-widest">
                        <h2>Projects</h2>
                    </div>

                    <div className="grid border-2 border-(--border-template-three) rounded-xl p-3 lg:p-5 gap-4 lg:gap-5">

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
            >

                <div className="grid grid-cols-1 gap-4 h-full w-full">
                    <div className="text-2xl lg:text-4xl tracking-widest">
                        <h2>Certificates</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center border-2 border-(--border-template-three) rounded-xl p-3 lg:p-5 gap-4 lg:gap-5 mb-10">
                            
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