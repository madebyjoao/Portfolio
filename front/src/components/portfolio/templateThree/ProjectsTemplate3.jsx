import { Github, Globe } from "lucide-react";
import { BASE_URL } from "../../../api/config";

export default function ProjectTemplateThree(props) {

    const ensureHttps = (url) => {
        if (!url) return url;
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };


    return (

        <div className="grid grid-cols-1 grid-rows-1 gap-x-4 gap-y-4 h-full">
            <div className="">

                <div className="grid grid-cols-[auto_1fr] grid-rows-3 gap-2 h-full w-full p-2">

                    <div className="bg-teal-500 row-span-2 h-fit w-fit">

                        <img 
                            className="h-65 w-65"                   
                            src={props.thumbnail} alt="Project thumbnail picture" 
                        />

                    </div>

                    <div className="bg-yellow-500 col-start-2 ">
                        {props.title} 
                        {props.technologies.map( (tech) => <strong>{tech}</strong>)}
                    </div>

                    <div className="bg-rose-500 col-start-2 row-start-2">
                        {props.description}
                    </div>
                    
                    <div className="row-start-3 col-span-2 flex justify-between">
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
                                
                        </div>

                    </div>

                </div>

            </div>

        </div>  

       /*  <div>
            {projects.map((project) => {
                const images = project.images.slice().sort((a, b) => a.order_index - b.order_index);
                return (
                    <div 
                        className="w-full"
                        key={project.id}
                    >
                            <h1>{project.title}</h1>
                        {images.map((img) => (
                            <img key={img.id} src={`${BASE_URL}/uploads/${project.thumbnail}`} alt={project.title} />
                        ))}
                    </div>
                );
            })}
        </div>   */
    )
}