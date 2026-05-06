import { useParams } from "react-router";
import { Link, Element } from 'react-scroll';   
import { fontFamilies } from "@/utils/fonts";
import { scrollToTop } from "@/utils/helpers"


export default function NavBarTemplateThree({ title, portfolio_info }) {

    const { slug } = useParams();

    const titlePortfolio = title;
    const fontNavbar = fontFamilies[portfolio_info.portfolio.font_navbar];
    console.log(fontNavbar)

    return (

        <Element name="nav">
            <nav 
                id="nav"
                style={{ fontFamily: fontNavbar}}
                className="relative flex items-center left-[2.22%] bg-(--navbar-template-three) min-h-25 max-w-[calc(100vw-2.22%)] border-2 border-(--border-template-three) rounded-bl-full rounded-tl-full p-3 mt-2">
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
                            offset={-70} 
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
                            offset={-70} 
                            spy={true} 
                            activeClass="active"
                        >
                            Certificates
                        </Link>
                        <Link 
                            className="hover:cursor-pointer"
                            to=""
                            smooth={true} 
                            duration={500} 
                            offset={-70} 
                            spy={true} 
                            activeClass="active"
                        >
                            Download CV
                        </Link>
                    </div>
                </div>
                

            </nav>
        </Element>
    )
}