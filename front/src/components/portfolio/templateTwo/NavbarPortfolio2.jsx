import { NavLink, useParams } from "react-router";
import { BASE_URL } from "../../../api/config";
import { fontFamilies } from "../../../utils/fonts";

export default function NavbarPortfolio2({ title, portfolio_info }) {
    
    const { slug } = useParams();
    console.log(portfolio_info)
    const navFont = fontFamilies[portfolio_info.portfolio.font_navbar];

    async function handleOpenCV() {
        try {
            const cvUrl = `${BASE_URL}/uploads/${portfolio_info.portfolio.cv_path}`;
            const response = await fetch(cvUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            window.open(url, '_blank');

            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error("Error opening the CV:", error);
            alert("Failed to open CV. Please try again.");
        }
    }

    return (
        <nav
            role="navigation"
            aria-label="Porfolio navigation"
            style={{ fontFamily: navFont }}
            className="fixed flex flex-col sm:flex-row justify-between items-center text-white bg-[rgb(0,0,0)] px-4 md:px-7 py-2 md:py-3 top-0 gap-2 md:gap-4 left-0 right-0 mx-auto max-w z-20"
        >
            <NavLink className="hover:underline text-sm md:text-base font-semibold" to={`/u/${slug}`}>
                {title ?? "Portfolio Name"}
            </NavLink>

            <div className="flex flex-wrap justify-center sm:justify-between gap-4 md:gap-8 text-sm md:text-base">
                <NavLink to={`/u/${slug}/certificates`} className="hover:underline">
                    Certificates
                </NavLink>
                {portfolio_info.portfolio.cv_path && (
                    <button 
                        onClick={handleOpenCV} 
                        className="hover:underline hover:cursor-pointer"
                    >
                        Download CV
                    </button>
                )}
            </div>
        </nav>
    );
}
