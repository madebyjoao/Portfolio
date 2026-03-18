

export default function CertificatesBox({certificates_info}) {

    return (
        <div className="flex flex-col border-none bg-[rgb(234,228,213)] p-6 rounded-lg">

            <h1 className="font-extrabold">{certificates_info.title}</h1>
            <img src="" alt="" />
            <strong>{certificates_info.description}</strong>

        </div>
    )
}