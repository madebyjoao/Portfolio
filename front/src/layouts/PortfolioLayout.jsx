import { Outlet } from "react-router";
import Footer from "../components/Footer";
import NavbarPortfolio from "../components/NavbarPortfolio";

export default function PortfolioLayout() {


    return (
        <div className="min-h-screen flex flex-col">

            <NavbarPortfolio />

                <main>

                    <Outlet />

                </main>

            <Footer />
            

        </div>
    );
}
