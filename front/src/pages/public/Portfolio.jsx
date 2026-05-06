import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug, getProjectsBySlug } from "../../api/portfolio";
import TemplateOne from "../../components/templates/TemplateOne";
import TemplateTwo from "../../components/templates/TemplateTwo";
import AccessDeniedPage from "./AccessDenied";
import TemplateThree from "../../components/templates/TemplateThree";

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

    if (portfolioError?.response?.status === 403 || projectsError?.response?.status === 403) {
        return <AccessDeniedPage alertMessage="This portfolio is not published." />;
    }

    const isMistake = isPortfolioError || isProjectsError;
    const errorMessage = portfolioError || projectsError;

    if (isMistake) {
        return <div>Erreur : {errorMessage.message}</div>;
    }

    const template = portfolioData.data.portfolio.template;
    const portfolio_info = portfolioData?.data;
    const projects = projectsData?.data;


    switch (template) {
        case 1:
            return (
                <TemplateOne
                    portfolio_info={portfolio_info}
                    projects={projects}
                />
            );
            break;

        case 2:
            return (
                <TemplateTwo
                    portfolio_info={portfolio_info}
                    projects={projects}
                />
            );
            break;

        case 3:
            return (
                <TemplateThree
                    portfolio_info={portfolio_info}
                />
            );
            break;

        default:
            return (
                <>
                    <h1>no template</h1>
                </>
            );
    }
}
