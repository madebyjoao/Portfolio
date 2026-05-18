import AboutBox from "../portfolio/templateOne/AboutBox";
import ProjectsAccordion from "../portfolio/templateTwo/ProjectsAccordion";


export default function TemplateTwo({ portfolio_info, projects }) {
    const projectsData = projects.projects.slice().sort((a, b) => a.order_index - b.order_index);

    const info = portfolio_info.portfolio;


    return (
        <div className="relative top-16 md:top-20 flex flex-col gap-4 md:gap-6 px-4 md:px-0 pb-30 mb-4">
            <div className="my-4 md:my-5 md:left-[3%] md:relative max-w-100">
                <h1 className="text-2xl md:text-4xl font-bold">
                    My Projects
                </h1>
            </div>
            <ProjectsAccordion projects={projectsData} />

        </div>
    );
}
