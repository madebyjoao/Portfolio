import AboutBox from "../AboutBox";
import ProjectsBox from "../Projects";



export default function TemplateOne({portfolio_info}) {

    const info = portfolio_info.portfolio;
    
    return (
        <div className="relative top-50">
            <ProjectsBox />
            <h1 className="text-white">This is Your Portfolio Template {info.template}</h1>
            <AboutBox about_title={info.about_title} about_text={info.about_text}/>
        </div>
    )
}