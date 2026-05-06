import { Outlet, useParams } from "react-router";
import NavbarPortfolio from "../components/portfolio/templateOne/NavbarPortfolio";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../api/portfolio";
import NavbarPortfolio2 from "../components/portfolio/templateTwo/NavbarPortfolio2";
import FooterPortfolio1 from "../components/portfolio/templateOne/Footer";
import FooterPortfolio2 from "../components/portfolio/templateTwo/Footer";
import NoTemplate from "../pages/public/NoTemplate";
import NavBarTemplateThree from "../components/portfolio/templateThree/NavBarTemplate3";
import FooterTemplateThree from "../components/portfolio/templateThree/FooterTemplate3";

export default function PortfolioLayout() {
    const { slug } = useParams();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["portfolio", slug],
        queryFn: () => getPortfolioBySlug(slug),
        enabled: !!slug,
    });

    if (isError) {
        return <div>Erreur : {error.message}</div>;
    }

    const title = data?.data?.portfolio.title ?? "Portfolio Name";
    const portfolio_info = data?.data;
    const template = data?.data.portfolio.template;

    switch (template) {
        case 1:
            return (
                <div className="min-h-screen flex flex-col bg-(--bg-template-one)">
                    <NavbarPortfolio 
                        title={isPending ? "Loading..." : title} 
                        portfolio_info={portfolio_info}
                    />

                    <main className="flex-1 pb-32 mb-20">
                        <Outlet />
                    </main>

                    <footer className="fixed bottom-0">
                        <FooterPortfolio1 portfolio_info={portfolio_info} />
                    </footer>
                </div>
            );
            break;

        case 2:
            return (
                <div className="min-h-screen flex flex-col bg-(--bg-template-two)">
                        <NavbarPortfolio2
                            title={isPending ? "Loading..." : title}
                            portfolio_info={portfolio_info}
                        />

                    <main>
                        <Outlet />
                    </main>
                    <footer className="fixed bottom-0">
                        <FooterPortfolio2 
                            portfolio_info={portfolio_info}
                        />
                    </footer>
                </div>
            );
            break;

        case 3:
            return (
                <div className="grid grid-cols-4 grid-rows-[auto_1fr_auto] gap-y-2 min-h-screen bg-(--bg-template-three)">
                    <header className="sticky top-1 col-span-4 z-10 w-full">
                        <NavBarTemplateThree 
                            title={isPending ? "Loading..." : title}
                            portfolio_info={portfolio_info}
                        />
                    </header>
                    <main className="row-start-2 col-span-4 h-full">
                        <Outlet />
                    </main>
                    <footer className="sticky bottom-0 row-start-3 col-span-4 bg-(--bg-template-three) z-95">
                        <FooterTemplateThree 
                            portfolio_info={portfolio_info}
                        />
                    </footer>
                </div>   
            );
            break;

        default:
            return (
               <NoTemplate />
            );
    }
}
