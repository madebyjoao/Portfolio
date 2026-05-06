import { BASE_URL } from "../../../api/config";

export default function ProjectTemplateThree({ thumbnail }) {



    return (

        <div className="grid grid-cols-1 grid-rows-1 gap-x-4 gap-y-4 h-full">
            <div className="bg-indigo-500">
                <div className="grid grid-cols-2 grid-rows-3 gap-2 h-full w-full p-2">
                    <div className="bg-teal-500 row-span-2 h-fit">
                        <img 
                            className="h-65 w-65"                   
                            src={thumbnail} alt="" 
                        />
                    </div>
                    <div className="bg-slate-500 row-start-3 col-span-2">

                    </div>
                    <div className="bg-rose-500 col-start-2 row-start-2">

                    </div>
                    <div className="bg-yellow-500 col-start-2">

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