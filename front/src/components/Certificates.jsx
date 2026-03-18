import { BASE_URL } from "../api/config";


export default function CertificatesBox({certificates_info}) {


    return (

        <div className="flex flex-col left-border-none bg-[rgb(234,228,213)] p-6 rounded-lg justify-center">

            <h1 className="font-extrabold">{certificates_info.title}</h1>
            <img src={`${BASE_URL}/uploads/${certificates_info.image_path}`} alt={certificates_info.title} />
            <strong>{certificates_info.description}</strong>

        </div>
    )
}