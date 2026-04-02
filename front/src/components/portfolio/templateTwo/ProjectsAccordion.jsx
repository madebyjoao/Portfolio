import { useState } from "react";
import { BASE_URL } from "../../../api/config";
import { ArrowBigDown } from "lucide-react";

function AccordionItem({
    project_title,
    project_description,
    project_thumbnail,
    project_repo_url,
    project_live_url,
    project_index,
    project_images,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);

    console.log(project_images)

    function getFirstLetter(word) {
        return word[0].toUpperCase();
    }

    return (
        <div className="border-b border-white/10 last:border-none">
            {/* Header row */}
            <button
                className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="flex item-center gap-4">
                    <div className="relative flex justify-center items-center size-62.5"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}

                    >
                        {!isHover ? (
                            <div className="inline-flex items-start">
                                <span className="text-2xl leading-none mt-2">
                                    {project_index}
                                </span>
                                <span className="text-9xl leading-none">
                                    {getFirstLetter(project_title)}
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <span className="text-base font-semibold">
                                    {project_title}
                                </span>
                            </div>
                               
                        )}
                        
                    </div>
                    
                    <div className="flex overflow-x-scroll scroll-smooth gap-4">
                        <div className="size-62.5">
                            <img
                                className="w-full h-full"
                                src={`${BASE_URL}/uploads/${project_thumbnail}`}
                                alt={`${project_title} Thumbnail`}
                            />
                        </div>

                        <div className="flex gap-4 h-62.5">
                            {project_images.map((images) => (
                                <div>
                                    
                                    <img className="h-62.5 w-full"
                                        src={`${BASE_URL}/uploads/${images.image_path}`}
                                    />
                                    
                                </div>

                            ))

                            }
                        </div>

                    </div>

                </div>
                <span
                    className="text-lg transition-transform duration-200"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                >
                    <ArrowBigDown />
                </span>
            </button>

            {/* Expanded content */}
            {isOpen && (
                <div className="flex gap-6 px-4 pb-6">
                    <div className="shrink-0 size-62.5 overflow-hidden">
                        <img
                            className="w-full h-full"
                            src={`${BASE_URL}/uploads/${project_thumbnail}`}
                            alt={`${project_title} Thumbnail`}
                        />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <h1>
                            {project_title}
                        </h1>
                        <p className="text-sm opacity-70">
                            {project_description}
                        </p>
                        <div className="flex gap-3">
                            {project_repo_url && (
                                <a
                                    href={project_repo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-white/10 transition-colors"
                                >
                                    GitHub
                                </a>
                            )}
                            {project_live_url && (
                                <a
                                    href={project_live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                                >
                                    Live Demo
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
                    project_index={project.order_index}
                    project_images={project.images}
                />
            ))}
        </div>
    );
}
