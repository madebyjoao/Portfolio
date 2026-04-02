import AboutBox from "../portfolio/AboutBox";
import ProjectsBox from "../portfolio/Projects";



export default function TemplateOne({portfolio_info, projects}) {
    const projectsData = projects.projects;

    console.log("template1", projectsData);

    const info = portfolio_info.portfolio;
    console.log("template1 info", info);
    
    return (
        <div className="relative top-30">
            <div className="flex flex-col gap-4">
                {projectsData.slice().sort((a, b) => a.order_index - b.order_index) 
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
            <h1 className="text-white">This is Your Portfolio Template {info.template}</h1>
            <AboutBox about_title={info.about_title} about_text={info.about_text}/>
        </div>
    )
}