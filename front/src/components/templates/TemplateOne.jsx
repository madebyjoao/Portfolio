import ProjectsBox from "../portfolio/templateOne/Projects";

export default function TemplateOne({ projects }) {
    const projectsData = projects.projects;


    return (
        <div className="relative top-30">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center">
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
