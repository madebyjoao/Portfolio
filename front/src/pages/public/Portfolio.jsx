import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../../api/portfolio";
import TemplateOne from "../../components/templates/TemplateOne";
import TemplateTwo from "../../components/templates/TemplateTwo";


export default function Portfolio() {
  const { slug } = useParams();

  const { 
    isPending: isPortfolioPending, 
    isError: isPortfolioError, 
    data: portfolioData, 
    error: portfolioError, 
  } = useQuery({
    queryKey: ["portfolio", slug],
    queryFn: () => getPortfolioBySlug(slug),
    enabled: !!slug,
  });

  const { 
    isPending: isProjectsPending, 
    isError: isProjectsError, 
    data: projectsData, 
    error: projectsError, 
  } = useQuery({
    queryKey: ["projects", slug],
    queryFn: () => getProjectsBySlug(slug),
    enabled: !!slug,
  });

  const isLoading = isPortfolioPending || isProjectsPending;


  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  const isMistake = isPortfolioError || isProjectsError;

  if (isMistake) {
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


