import { Github, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL } from "../../../api/config";
import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";


export default function ProjectTemplateThree(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, containScroll: false }, [Fade()]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const ensureHttps = (url) => {
        if (!url) return url;
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    console.log(props.technologies)

return (

        <div className="border-2 border-(--border-template-three) rounded-xl">
            
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-3 md:gap-4 p-3 md:p-4">

                    {/* Thumbnail - Full width on mobile, left column on desktop */}
                    <div className="flex justify-center md:row-span-2 md:h-fit md:w-fit border-2 border-(--border-template-three) rounded-xl p-2">
                        <img 
                            className="w-full max-w-62.5 md:max-w-none md:w-auto md:h-65 object-cover rounded-lg"                   
                            src={props.thumbnail} alt="Project thumbnail picture" 
                        />
                    </div>

                    {/* Title and Technologies */}
                    <div className="flex flex-col gap-3 border-2 border-(--border-template-three) rounded-xl p-3">
                        <div className="text-2xl md:text-4xl tracking-widest font-semibold">{props.title}</div>
                        <div className="flex flex-wrap gap-2">
                            {props.technologies && 
                                (props.technologies.map((tech, index) => (
                                <strong 
                                    key={index}
                                    className="flex justify-center items-center px-3 py-1.5 border-2 border-(--border-template-three) rounded-full text-sm"
                                >
                                    {tech}
                                </strong>
                            )))}
                            
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-2 border-(--border-template-three) rounded-xl p-3 text-sm md:text-base">
                        {props.description}
                    </div>
                    
                    {/* Actions: Links and Images Button */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-3 border-2 border-(--border-template-three) rounded-xl p-3">
                        <div className="flex flex-wrap gap-3">
                            {props.github &&
                                <a  
                                    target="_blank"
                                    className="flex items-center gap-2 border-2 border-(--border-template-three) rounded-full px-4 py-2 hover:bg-(--border-template-three)/10 transition text-sm md:text-base"
                                    href={ensureHttps(props.github)}>
                                    <Github size={18} /> <span>GitHub</span>
                                </a>
                            }

                            {props.website &&
                                <a 
                                    target="_blank"
                                    className="flex items-center gap-2 border-2 border-(--border-template-three) rounded-full px-4 py-2 hover:bg-(--border-template-three)/10 transition text-sm md:text-base"
                                    href={ensureHttps(props.website)}>
                                    <Globe size={18}/> <span>Website</span>
                                </a>
                            }
                        </div>
                        <div>
                            <button
                                onClick={toggleModal}
                                className="flex items-center gap-2 border-2 border-(--border-template-three) rounded-full px-4 py-2 hover:bg-(--border-template-three)/10 transition hover:cursor-pointer text-sm md:text-base w-full sm:w-auto justify-center"
                            >
                                Images
                            </button>

                                {isOpen && 

                                    <div 
                                        onClick={toggleModal}
                                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-999 p-4"  
                                    >
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="relative w-full h-full md:w-3/4 md:h-3/4 lg:w-2/3 lg:h-2/3"
                                        >
                                            <div ref={emblaRef} className="overflow-hidden h-full rounded-xl">
                                                <div className="flex h-full" style={{ touchAction: "pan-y pinch-zoom" }}>
                                                    {props.images.map((image, index) => (
                                                        <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
                                                            <img
                                                                className="h-full w-full object-cover"
                                                                src={`${BASE_URL}/uploads/${image.image_path}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={scrollPrev}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 hover:cursor-pointer"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={scrollNext}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 hover:cursor-pointer"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>

                                    </div>
                                
                                }
                        </div>

                    </div>

                </div>

        </div>  

    )
}