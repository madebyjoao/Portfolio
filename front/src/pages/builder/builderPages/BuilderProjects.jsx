import ProjectsAccordion from "../../../components/builder/projects/ProjectEditForm";

export default function BuilderProjects() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="font-bold text-3xl text-(--builder-Sidebar-text)">
                    My Projects
                </h1>
                <ProjectsAccordion />
            </div>
        </div>
    );
}
