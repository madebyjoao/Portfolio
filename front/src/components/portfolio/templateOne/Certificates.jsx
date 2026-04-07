import { BASE_URL } from "../../../api/config";

export default function CertificatesBox({ certificates_info, certificates_length }) {
    console.log(certificates_info)
    return (
        <div className="flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
            <div
                className="bg-gray-50 p-8 flex items-center justify-center "
                style={{ minHeight: "500px" }}
            >
                <img
                    className="w-full h-125 object-contain border-none rounded-xl "
                    src={`${BASE_URL}/uploads/${certificates_info.image_path}`}
                    alt={certificates_info.title}
                />


            </div>

            <div className="bg-[rgb(234,228,213)] p-6 space-y-2">
                
                <div className="flex">
                    <h1 className="text-2xl font-extrabold text-gray-900">
                        {certificates_info.title}
                    </h1>

                    <p>{certificates_info.order_index}/{certificates_length}</p>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                    {certificates_info.description}
                </p>
            </div>
        </div>
    );
}
