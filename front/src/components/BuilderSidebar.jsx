import { LayoutDashboard, User, FolderKanban, Brush, Eye, Settings, Award, Home } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function BuilderSidebar() {

    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");

    return (
        <aside className="w-72 min-h-screen bg-[rgb(24,61,61)] text-white flex flex-col p-6">
            <div className="mb-10">
                <h2 className="text-2xl font-bold">Builder</h2>
                <p className="text-sm text-gray-300 mt-2">Create your portfolio, <strong>{firstName} {lastName}</strong></p>
            </div>

            <nav className="flex flex-col gap-3">
                <NavLink to="/builder" className="flex items-center gap-3 hover:bg-[rgb(92,131,116)]/40 px-4 py-3 rounded-lg text-left transition">
                    <LayoutDashboard size={18} />
                    Dashboard
                </NavLink>

                <NavLink to="/builder/projects" className="flex items-center gap-3 hover:bg-[rgb(92,131,116)]/40 px-4 py-3 rounded-lg text-left transition">
                    <FolderKanban size={18} />
                    Projects
                </NavLink>

                <NavLink to="/builder/certificates" className="flex items-center gap-3 hover:bg-[rgb(92,131,116)]/40 px-4 py-3 rounded-lg text-left transition">
                    <Award size={18} />
                    Certificates
                </NavLink>

                <NavLink to="/builder/preview" className="flex items-center gap-3 hover:bg-[rgb(92,131,116)]/40 px-4 py-3 rounded-lg text-left transition">
                    <Eye size={18} />
                    Preview
                </NavLink>

            </nav>

            <div className="flex flex-col items-start mt-auto pt-6 border-t border-white/10">

                <Link to="/" aria-label="Button Home Page" className="flex gap-1 p-1 text-sm">
                    <Home size={19}/>
                    <p>Go home</p>                    
                </Link>
               
                <p className="text-sm text-gray-300 p-1">Portfolio Builder Panel</p>
                
            </div>
        </aside>
    );
}