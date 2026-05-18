import { useParams } from "react-router";
import { Link, Element } from 'react-scroll';   
import { fontFamilies } from "@/utils/fonts";
import { scrollToTop } from "@/utils/helpers"
import { BASE_URL } from "../../../api/config";


export default function NavBarTemplateThree({ title, portfolio_info }) {

    const { slug } = useParams();

    const titlePortfolio = title;
    const fontNavbar = fontFamilies[portfolio_info.portfolio.font_navbar];

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

        <Element name="nav">
            <nav 
                id="nav"
                style={{ fontFamily: fontNavbar}}
                className="relative flex items-center left-[2.22%] bg-(--navbar-template-three) min-h-25 max-w-[calc(100vw-2.22%)] border-2 border-(--border-template-three) rounded-bl-full rounded-tl-full p-3 mt-2 z-11">
                
                <div className="flex items-center justify-between w-full text-(--template-three-text-title) ml-2 mr-6 tracking-widest">
                    <Link
                        onClick={scrollToTop}
                        to=""
                        smooth={true} 
                        duration={500} 
                        offset={-70}
                        className="hover:cursor-pointer"
                    >
                            { title ?? "Portfolio Name" }
                    </Link>
                    <div className="flex items-center gap-6">                       
                        <Link 
                            className="hover:cursor-pointer"
                            to="projects"
                            smooth={true} 
                            duration={500} 
                            offset={-140} 
                            spy={true} 
                            activeClass="active"
                        >
                            Projects
                        </Link>
                        <Link 
                            className="hover:cursor-pointer"
                            to="certificates"
                            smooth={true} 
                            duration={500} 
                            offset={-140} 
                            spy={true} 
                            activeClass="active"
                        >
                            Certificates
                        </Link>
                        {portfolio_info.portfolio.cv_path && (
                            <button 
                                onClick={handleOpenCV} 
                                className="hover:underline hover:cursor-pointer"
                            >
                                Download CV
                            </button>
                        )}
                    </div>
                </div>
                

            </nav>
        </Element>
    )
}