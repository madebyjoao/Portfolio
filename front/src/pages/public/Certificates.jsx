import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCertificatesBySlug } from "../../api/portfolio";
import CertificatesBox from "../../components/Certificates";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


export default function Certificates() {

  const { slug } = useParams();
  const [currentCertif, setCurrentCertif] = useState(0);


  const { isPending, isError, data, error } = useQuery({
    queryKey: ["certificates", slug],
    queryFn: () => getCertificatesBySlug(slug),
    enabled: !!slug,
  });

  if (isPending) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }
  if (!data) {
    return <div>No certificates</div>
  }
  const certificates_info = data.data.certificates;

  const next = () => {
    setCurrentCertif((prev) => (prev + 1) % certificates_info.length);
  };

  const prev = () => {
    setCurrentCertif((prev) => (prev - 1 + certificates_info.length) % certificates_info.length)
  };

  return (

      <div className="fixed flex flex-col items-center justify-center gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button onClick={prev} className="absolute left-0 z-10" aria-label="Previous Certificate">
          <ChevronLeftIcon size={50} strokeWidth={4}/>
        </button>
        
        <CertificatesBox  certificates_info={certificates_info[currentCertif]} />

        <button onClick={prev} className="absolute right-0 z-10" aria-label="Next Certificate">
          <ChevronRightIcon size={50} strokeWidth={4}/>
        </button>
      </div>

  )
}