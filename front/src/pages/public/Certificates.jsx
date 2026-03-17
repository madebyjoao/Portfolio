import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCertificatesBySlug } from "../../api/portfolio";


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
    <div className="fixed top-50 ">
      <h1 className="text-white">Contact page</h1>
      <div className="flex flex-col ">
        {certificates_info.map((certif) => (
          <div className="bg-green-700 gap-3 m-2">
            <h2>{certif.title}</h2>
            <h3>{certif.description}</h3>

          </div>
        ))}
      </div>
    </div>
  )
}