import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCertificatesBySlug } from "../../api/portfolio";
import CertificatesBox from "../../components/Certificates";


export default function Certificates() {

  const { slug } = useParams();


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

  return (

      <div className="flex flex-col content-center justify-center gap-2 top-50 w-1/2">
        {certificates_info.map((certif) => (
          <CertificatesBox  certificates_info={certif}/>
        ))}
      </div>

  )
}