import AboutBox from "../AboutBox";
import ProjectsBox from "../Projects";



export default function TemplateTwo({portfolio_info}) {

    return (
        <div className="relative top-50">
            <ProjectsBox />
            <h1 className="text-white">This is Your Portfolio Template {portfolio_info.portfolio.template}</h1>
            <h2 className="text-white">{portfolio_info.portfolio.about_title}</h2>
            <h2 className="text-white">{portfolio_info.portfolio.about_text}</h2>
            <AboutBox />
        </div>
    )
}