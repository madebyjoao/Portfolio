import { BASE_URL } from "../../../api/config";

export default function CertificatesBox({ certificates_info, certificates_length }) {
    console.log(certificates_info)
    return (
        <div className="flex flex-col bg-white max-w-4xl w-full rounded-2xl">
            <div
                className="bg-gray-50 p-8 flex items-center justify-center"
               
            >
                <img
                    className="w-full h-100 object-contain "
                    src={`${BASE_URL}/uploads/${certificates_info.image_path}`}
                    alt={certificates_info.title}
                />


            </div>

            <div className="bg-[rgb(234,228,213)] p-6 space-y-2">
                
                <div className="flex justify-between">
                    <h1 className="text-2xl font-extrabold text-gray-900">
                        {certificates_info.title}
                    </h1>

                    <p className="font-bold text-sm">
                        {certificates_info.order_index}/{certificates_length}
                    </p>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                    {certificates_info.description}
                </p>
            </div>
        </div>
    );
}
