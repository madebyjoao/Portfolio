import { Outlet, useParams } from "react-router";
import Footer from "../components/Footer";
import NavbarPortfolio from "../components/portfolio/templateOne/NavbarPortfolio";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioBySlug } from "../api/portfolio";
import NavbarPortfolio2 from "../components/portfolio/templateTwo/NavbarPortfolio2";

export default function PortfolioLayout() {
    const { slug } = useParams();

    const { isPending, data } = useQuery({
        queryKey: ["portfolio", slug],
        queryFn: () => getPortfolioBySlug(slug),
        enabled: !!slug,
    });

    const title = data?.data?.portfolio.title ?? "Portfolio Name";

    const template = data?.data.portfolio.template;

        
        switch (template) {
            
            case 1:
                return (
                        <div className="min-h-screen flex flex-col">
                            <NavbarPortfolio title={isPending ? "Loading..." : title} />
                            
                            <main>

                                <Outlet />

                            </main>

                            <Footer />
                        

                        </div>
                    );
                    break;

                case 2:
                    return (

                         <div className="min-h-screen flex flex-col">
                            <NavbarPortfolio2 title={isPending ? "Loading..." : title} />
                            
                            <main>

                                <Outlet />

                            </main>

                            <Footer />
                        

                        </div>

                    );
                    break;
                
                default:
                      return (
                        <>
                          <h1>no template</h1>
                        </>
                      )
            };

}
