import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../../api/portfolio";
import TemplateOne from "../../components/templates/TemplateOne";
import TemplateTwo from "../../components/templates/TemplateTwo";

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
  

  switch (portfolio_info.portfolio.template) {

    case 1:
      return (
        <TemplateOne portfolio_info={portfolio_info} />
      );
      break;
    
    case 2:
      return (
        <TemplateTwo portfolio_info={portfolio_info} />
      );
      break;

    default:
      return (
        <>
          <h1>no template</h1>
        </>
      )
  }

}


