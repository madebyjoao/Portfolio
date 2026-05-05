import ProjectsBox from "../portfolio/templateOne/Projects";
import { fontFamilies } from "@/utils/fonts";

export default function TemplateOne({ projects }) {
    const projectsData = projects.projects;
    const mainFont = projects.font.font_main
    const font = fontFamilies[mainFont];


    return (
        <div 
            style={{ fontFamily: font }}
            className="w-full pt-20 pb-16">
            <div className="relative left-[3%] my-5 max-w-100">
                <h1 className=" text-4xl font-bold">
                    My Projects
                </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-y-10 gap-x-4 px-4 pb-16">
                {projectsData
                    .slice()
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((project) => (
                        <ProjectsBox
                            key={project.order_index}
                            project_title={project.title}
                            project_thumbnail={project.thumbnail}
                            project_description={project.description}
                            project_repo_url={project.repo_url}
                            project_live_url={project.live_url}
                        />
                    ))}
            </div>
            
        </div>
    );
}
