import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../../api/portfolio";

export default function Portfolio() {
  const { slug } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["portfolio", slug],
    queryFn: () => getPortfolioBySlug(slug),
    enabled: !!slug,
  });

  if (isPending) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  const portfolio_info = data.data;

  

  if (portfolio_info.template === 1) {
    return (
      <div className="relative top-50">
        <h1 className="text-white">This is Your Portfolio Template 1</h1>
      </div>
    );
  } else {
    return (
      <div className="relative top-50">
        <h1 className="text-white">This is Your Portfolio Template 2</h1>
      </div>
    );
  }
}


