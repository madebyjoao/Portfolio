import { useState } from "react";
import { BASE_URL } from "../../api/config";

function AccordionItem({ project_title, project_description, project_thumbnail, project_repo_url, project_live_url }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-none">
            {/* Header row */}
            <button
                className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="flex items-center gap-4">
                    <div className="shrink-0 w-14 h-14 overflow-hidden rounded-lg">
                        <img
                            className="w-full h-full object-cover"
                            src={`${BASE_URL}/uploads/${project_thumbnail}`}
                            alt={`${project_title} Thumbnail`}
                        />
                    </div>
                    <span className="text-base font-semibold">{project_title}</span>
                </div>
                <span className="text-lg transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ↓
                </span>
            </button>

            {/* Expanded content */}
            {isOpen && (
                <div className="flex gap-6 px-4 pb-6">
                    <div className="shrink-0 w-48 h-32 overflow-hidden rounded-lg">
                        <img
                            className="w-full h-full object-cover"
                            src={`${BASE_URL}/uploads/${project_thumbnail}`}
                            alt={`${project_title} Thumbnail`}
                        />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <p className="text-sm opacity-70">{project_description}</p>
                        <div className="flex gap-3">
                            {project_repo_url && (
                                <a
                                    href={project_repo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-white/10 transition-colors"
                                >
                                    GitHub ↗
                                </a>
                            )}
                            {project_live_url && (
                                <a
                                    href={project_live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                                >
                                    Live Demo ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProjectsAccordion({ projects }) {
    return (
        <div className="rounded-xl border border-white/10 overflow-hidden">
            {projects.map((project) => (
                <AccordionItem
                    key={project.order_index}
                    project_title={project.title}
                    project_thumbnail={project.thumbnail}
                    project_description={project.description}
                    project_repo_url={project.repo_url}
                    project_live_url={project.live_url}
                />
            ))}
        </div>
    );
}
