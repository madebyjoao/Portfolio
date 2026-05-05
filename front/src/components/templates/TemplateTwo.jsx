import AboutBox from "../portfolio/templateOne/AboutBox";
import ProjectsAccordion from "../portfolio/templateTwo/ProjectsAccordion";

export default function TemplateTwo({ portfolio_info, projects }) {
    const projectsData = projects.projects.slice().sort((a, b) => a.order_index - b.order_index);

    const info = portfolio_info.portfolio;


    return (
        <div className="relative top-20 flex flex-col gap-6 ">
            <div className="relative left-[3%] my-5 max-w-100">
                <h1 className=" text-4xl font-bold">
                    My Projects
                </h1>
            </div>
            <ProjectsAccordion projects={projectsData} />

            <h1 className="">
                This is Your Portfolio Template {info.template}
            </h1>
            <AboutBox
                about_title={info.about_title}
                about_text={info.about_text}
            />
        </div>
    );
}
