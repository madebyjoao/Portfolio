import { NavLink, useParams } from "react-router";
import { BASE_URL } from "../../../api/config";

export default function NavbarPortfolio({ title, portfolio_info }) {
    const { slug } = useParams();

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
            className="fixed flex justify-between items-center rounded-bl-3xl rounded-br-3xl text-white bg-[rgb(24,61,61)] h-20 px-10 py-3 top-0 gap-4 left-0 right-0 mx-auto shadow-[0_0_30px_rgba(24,61,61,0.7)] z-20"
        >
            <NavLink to={`/u/${slug}`}>
                {title ?? "Portfolio Name"}
            </NavLink>
            <NavLink to={`/u/${slug}/certificates`}>
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
        </nav>
    );
}
