import { Navigate, useNavigate } from "react-router";
import "../../index.css"



function Home() {
    const navigate = useNavigate();
   

    return (
        <div className="relative flex flex-col items-center justify-center h-full text-(--text-website)">
                
            <div className="relative z-10 mx-4 sm:mx-20 lg:mx-50">
                <h1 className="text-(--text-website) text-3xl sm:text-6xl font-bodoni">
                    Made By Joao Portfolio Builder
                </h1>
                <p className="text-(--text-website) mt-4 text-lg sm:text-xl leading-relaxed">
                    <span 
                        className="hover:underline font-bold hover:cursor-pointer"
                        onClick={() => navigate("/builder")}>Create
                    </span> your professional portfolio in minutes. Pick a template, add your projects and experience, and share a polished page with the world — no design skills required.
                </p>
            </div>
            
        </div>
    );
}
export default Home;
