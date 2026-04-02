import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCertificatesBySlug } from "../../api/portfolio";
import CertificatesBox from "../../components/portfolio/templateOne/Certificates";
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

      <div className="relative flex items-center justify-center min-h-screen py-8 px-4">
        <button 
            onClick={prev} 
            className="absolute left-4 md:left-8 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors" 
            aria-label="Previous Certificate"
        >
          <ChevronLeftIcon size={40} strokeWidth={3}/>
        </button>
        
        <CertificatesBox  certificates_info={certificates_info[currentCertif]} />

        <button 
            onClick={next} 
            className="absolute right-4 md:right-8 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors" 
            aria-label="Next Certificate"
        >
          <ChevronRightIcon size={40} strokeWidth={3}/>
        </button>
      </div>

  )
}