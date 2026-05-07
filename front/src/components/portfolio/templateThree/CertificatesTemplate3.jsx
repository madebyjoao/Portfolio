import { BASE_URL } from "../../../api/config";


export default function CertificatesTemplateThree(props) {

    return (

        <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-x-4 gap-y-4 w-4/5 border-2 border-(--border-template-three) rounded-xl p-5">
         
            <div className="grid grid-cols-1 grid-rows-1 gap-2 h-full w-full border-2 border-(--border-template-three) rounded-xl p-5">
                <img 
                    className="w-full rounded-xl"
                    src={`${BASE_URL}/uploads/${props.thumbnail}`}
                />
            </div>
           
            <div className="row-start-2 h-full w-full border-2 border-(--border-template-three) rounded-xl p-5">
                <div className="grid grid-cols-1 grid-rows-2 gap-2 h-full w-full">
                    <div className="border-2 border-(--border-template-three) rounded-xl p-5">
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>                        
                    </div>
                    <div className="row-start-2 border-2 border-(--border-template-three) rounded-xl p-5">
                        <h3>{props.issuer}</h3>
                        <h3>{props.type}</h3>
                    </div>
                </div>
            </div>
            
        </div>
    )
}