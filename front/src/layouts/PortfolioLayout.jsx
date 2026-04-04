import { Outlet, useParams } from "react-router";
import NavbarPortfolio from "../components/portfolio/templateOne/NavbarPortfolio";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../api/portfolio";
import NavbarPortfolio2 from "../components/portfolio/templateTwo/NavbarPortfolio2";
import FooterPortfolio1 from "../components/portfolio/templateOne/Footer";
import FooterPortfolio2 from "../components/portfolio/templateTwo/Footer";

export default function PortfolioLayout() {
    const { slug } = useParams();

    const { isPending, data } = useQuery({
        queryKey: ["portfolio", slug],
        queryFn: () => getPortfolioBySlug(slug),
        enabled: !!slug,
    });

    const title = data?.data?.portfolio.title ?? "Portfolio Name";
    const portfolio_info = data?.data;
    const template = data?.data.portfolio.template;

    switch (template) {
        case 1:
            return (
                <div className="min-h-screen flex flex-col bg-[rgb(147,177,166)] font-mono">
                    <NavbarPortfolio title={isPending ? "Loading..." : title} />

                    <main>
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
                <div className="min-h-screen flex flex-col bg-white">
                    <NavbarPortfolio2
                        title={isPending ? "Loading..." : title}
                    />

                    <main>
                        <Outlet />
                    </main>
                    <footer className="fixed bottom-0">
                        <FooterPortfolio2 />
                    </footer>
                </div>
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
