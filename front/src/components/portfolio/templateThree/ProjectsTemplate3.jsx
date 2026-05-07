import { Github, Globe } from "lucide-react";
import { BASE_URL } from "../../../api/config";
import { useState } from "react";

export default function ProjectTemplateThree(props) {

    const [isOpen, setIsOpen] = useState(false);

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

    console.log(props.images)

    return (

        <div className="grid grid-cols-1 grid-rows-1 gap-x-4 gap-y-4 h-full border-2 border-(--border-template-three) rounded-xl">
            
                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-2 h-full w-full p-2 ">

                    <div className="row-span-2 h-fit w-fit border-2 border-(--border-template-three) rounded-xl p-2">

                        <img 
                            className="h-65 w-65"                   
                            src={props.thumbnail} alt="Project thumbnail picture" 
                        />

                    </div>

                    <div className="flex col-start-2 flex-col gap-2 border-2 border-(--border-template-three) rounded-xl p-2">
                        <div className="text-4xl tracking-widest">{props.title} </div>
                        <div className="flex gap-2 pl-2">
                            {props.technologies.map( (tech) => (
                                <strong 
                                    key={props.order_index}
                                    className="flex justify-center gap-2 min-w-20 border-2 border-(--border-template-three) rounded-full p-2"
                                >
                                    {tech}
                                </strong>
                            ))}
                        </div>
                        
                    </div>

                    <div className="col-start-2 row-start-2 border-2 border-(--border-template-three) rounded-xl p-2">
                        {props.description}
                    </div>
                    
                    <div className="row-start-3 col-span-2 flex justify-between border-2 border-(--border-template-three) rounded-xl p-4 min-h-fit">
                        <div className="flex gap-4">
                            {props.github &&
                                <div className="size-fit">
                                    <a  
                                        target="_blank"
                                        className="flex gap-2 border-2 border-(--border-template-three) rounded-full p-2"
                                        href={ensureHttps(props.github)}>
                                        <Github /> <span>my github</span>
                                    </a>
                                </div> }

                            {props.website &&
                                <div>
                                    <a 
                                        target="_blank"
                                        className="flex gap-2 border-2 border-(--border-template-three) rounded-full p-2"
                                        href={ensureHttps(props.website)}>
                                        <Globe/> <span>My Website</span>
                                    </a>
                                </div>}
                        </div>
                        <div className="">
                                <button
                                    onClick={toggleModal}
                                    className="flex gap-2 border-2 border-(--border-template-three) rounded-full p-2 hover:cursor-pointer"
                                >
                                    Images
                                </button>

                                {isOpen && 

                                    <div 
                                        onClick={toggleModal}
                                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-999"  
                                    >
                                        <div
                                            className="flex flex-col w-1/2 h-2/3 bg-white"
                                        >
                                            <div
                                                className="flex w-full h-full"
                                            >
                                                {props.images.map( (image) => (

                                                    <div
                                                        
                                                        key={image.order_index}
                                                    >
                                                        <img 
                                                            className="h-40 w-40"
                                                            src={`${BASE_URL}/uploads/${image.image_path}`} alt="" />
                                                    </div>
                                                ))
                                                }
                                            </div>
                                            <div className="text-black h-fit w-full p-4">
                                                {props.description}
                                            </div>
                                        </div>

                                    </div>
                                
                                }
                        </div>

                    </div>

                </div>

        </div>  

    )
}