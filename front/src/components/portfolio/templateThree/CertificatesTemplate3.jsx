import { BASE_URL } from "../../../api/config";


export default function CertificatesTemplateThree(props) {

    return (

        <div className="grid grid-cols-1 gap-3 md:gap-4 w-full max-w-md border-2 border-(--border-template-three) rounded-xl p-3 md:p-5">
         
            {/* Certificate Image */}
            <div className="border-2 border-(--border-template-three) rounded-xl p-3 md:p-4">
                <img 
                    className="w-full rounded-lg"
                    src={`${BASE_URL}/uploads/${props.thumbnail}`}
                    alt={props.title}
                />
            </div>
           
            {/* Certificate Info */}
            <div className="flex flex-col gap-3 border-2 border-(--border-template-three) rounded-xl p-3 md:p-4">
                <div className="border-2 border-(--border-template-three) rounded-xl p-3">
                    <h2 className="font-semibold text-lg md:text-xl mb-1">{props.title}</h2>
                    <p className="text-sm md:text-base text-gray-300">{props.description}</p>                        
                </div>
                <div className="flex flex-col gap-1 border-2 border-(--border-template-three) rounded-xl p-3">
                    <h3 className="font-medium text-sm md:text-base">{props.issuer}</h3>
                    <h3 className="text-xs md:text-sm text-gray-400">{props.type}</h3>
                </div>
            </div>
            
        </div>
    )
}