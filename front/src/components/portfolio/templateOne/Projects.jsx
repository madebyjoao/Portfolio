import { useState } from "react";
import { BASE_URL } from "../../../api/config";

export default function ProjectsBox({ project_title, project_description, project_thumbnail, project_repo_url, project_live_url }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Card */}
            <div
                className="flex gap-4 rounded-xl p-3 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(true)}
            >
                <div className="shrink-0 w-48 h-32 overflow-hidden rounded-lg">
                    <img
                        className="w-full h-full object-cover"
                        src={`${BASE_URL}/uploads/${project_thumbnail}`}
                        alt={`${project_title} Thumbnail`}
                    />
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <h1 className="text-lg font-bold">{project_title}</h1>
                    <p className="text-sm line-clamp-2 opacity-70">{project_description}</p>
                    <span className="text-sm font-medium mt-1 opacity-50">View more →</span>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden max-w-lg w-full mx-4 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full h-56 overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src={`${BASE_URL}/uploads/${project_thumbnail}`}
                                alt={`${project_title} Thumbnail`}
                            />
                        </div>
                        <div className="p-6 flex flex-col gap-3">
                            <h2 className="text-2xl font-bold">{project_title}</h2>
                            <p className="text-sm opacity-70">{project_description}</p>
                            <div className="flex gap-3 mt-2">
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
                        <button
                            className="absolute top-4 right-4 text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}