import { useState } from "react";
import { BASE_URL } from "../../../api/config";
import { ArrowBigDown } from "lucide-react";
import Styles from "@/index.module.css"

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
    const galleryImages = Array.isArray(project_images) ? project_images : [];

    function getFirstLetter(word) {
        return word?.[0]?.toUpperCase() ?? "";
    }

    return (
        <div className="">
            {/* Header row */}
            <button
                type="button"
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-2 md:gap-4 p-3 md:p-4 text-left transition-colors hover:bg-white/10"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="min-w-0 flex-1 overflow-hidden">
                    <div className={`${Styles.noScroll} flex items-stretch gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-2`}>
                        <div
                            className="relative flex size-40 md:size-62.5 shrink-0 items-center justify-center"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            {!isHover ? (
                                <div className="inline-flex items-start">
                                    <span className="mt-1 md:mt-2 mr-1 text-lg md:text-2xl leading-none">
                                        {project_index}
                                    </span>
                                    <span className="text-5xl md:text-9xl leading-none">
                                        {getFirstLetter(project_title)}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center px-4 md:px-6 text-center">
                                    <span className="text-sm md:text-base font-semibold">
                                        {project_title}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="size-40 md:size-62.5 shrink-0 overflow-hidden bg-black/10">
                            <img
                                className="h-full w-full object-cover"
                                src={`${BASE_URL}/uploads/${project_thumbnail}`}
                                alt={`${project_title} Thumbnail`}
                            />
                        </div>

                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className="h-40 md:h-62.5 shrink-0 overflow-hidden bg-black/10"
                            >
                                <img
                                    className="h-full w-full object-cover"
                                    src={`${BASE_URL}/uploads/${image.image_path}`}
                                    alt={`${project_title} preview ${image.order_index}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <span
                    className="mt-2 shrink-0 text-base md:text-lg transition-transform duration-200"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                >
                    <ArrowBigDown className="w-5 h-5 md:w-6 md:h-6" />
                </span>
            </button>

            {/* Expanded content */}
            {isOpen && (
                <div className="flex flex-col gap-4 md:gap-6 px-3 md:px-4 pb-4 md:pb-6">
                    <div className="w-full max-w-sm md:size-62.5 md:max-w-none mx-auto md:mx-0 md:shrink-0 overflow-hidden bg-black/10">
                        <img
                            className="h-full w-full object-cover"
                            src={`${BASE_URL}/uploads/${project_thumbnail}`}
                            alt={`${project_title} Thumbnail`}
                        />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <h1 className="text-xl md:text-2xl font-bold">
                            {project_title}
                        </h1>
                        <p className="text-sm md:text-base opacity-70">
                            {project_description}
                        </p>
                        <div className="flex flex-wrap gap-3">
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
        <div className="rounded-xl border border-white/10">
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
