import { Outlet, useParams } from "react-router";
import Footer from "../components/Footer";
import NavbarPortfolio from "../components/portfolio/NavbarPortfolio";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../api/portfolio";

export default function PortfolioLayout() {
    const { slug } = useParams();

    const { isPending, data } = useQuery({
        queryKey: ["portfolio", slug],
        queryFn: () => getPortfolioBySlug(slug),
        enabled: !!slug,
    });

    const title = data?.data?.portfolio.title ?? "Portfolio Name";

    return (
        <div className="min-h-screen flex flex-col">

            <NavbarPortfolio title={isPending ? "Loading..." : title} />

                <main>

                    <Outlet />

                </main>

            <Footer />
            

        </div>
    );
}
