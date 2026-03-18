import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCertificatesBySlug } from "../../api/portfolio";
import CertificatesBox from "../../components/Certificates";


export default function Certificates() {

  const { slug } = useParams();
  console.log(slug);

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

  console.log("test", certificates_info)

  return (
    <div className="fixed top-50 flex align-center">
      <div className="flex flex-col gap-2">
        {certificates_info.map((certif) => (
          <CertificatesBox  certificates_info={certif}/>
        ))}
      </div>
    </div>
  )
}