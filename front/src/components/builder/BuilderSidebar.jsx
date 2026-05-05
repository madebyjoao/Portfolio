import {
    LayoutDashboard,
    User,
    FolderKanban,
    Brush,
    Eye,
    Settings,
    Award,
    Home,
    ScanBarcode,
} from "lucide-react";
import { Link, NavLink } from "react-router";

export default function BuilderSidebar() {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const slug = localStorage.getItem("slug")

    return (
        <aside className="flex flex-col p-6 w-1/6 min-h-screen rounded-md backdrop-blur bg-black/30 text-(--builder-Sidebar-text) ">
            <div className="mb-10">
                <h2 className="text-2xl font-bold">Builder</h2>
                <p className="text-sm text-gray-300 mt-2">
                    Create your portfolio,{" "}
                    <strong>
                        {firstName} {lastName}
                    </strong>
                </p>
            </div>

            <nav className="flex flex-col gap-3">
                <NavLink
                    to="/builder"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 hover:bg-(--builder-buttons)/40 px-4 py-3 rounded-lg text-left transition ${
                            isActive ? "bg-(--builder-buttons)" : ""
                        }`
                    }
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/builder/projects"
                    className={({ isActive }) =>
                        `flex items-center gap-3 hover:bg-(--builder-buttons)/40 px-4 py-3 rounded-lg text-left transition ${
                            isActive ? "bg-(--builder-buttons)" : ""
                        }`
                    }
                >
                    <FolderKanban size={18} />
                    Projects
                </NavLink>

                <NavLink
                    to="/builder/certificates"
                    className={({ isActive }) =>
                        `flex items-center gap-3 hover:bg-(--builder-buttons)/40 px-4 py-3 rounded-lg text-left transition ${
                            isActive ? "bg-(--builder-buttons)" : ""
                        }`
                    }
                >
                    <Award size={18} />
                    Certificates
                </NavLink>

                <NavLink
                    to="/builder/preview"
                    className={({ isActive }) =>
                        `flex items-center gap-3 hover:bg-(--builder-buttons)/40 px-4 py-3 rounded-lg text-left transition ${
                            isActive ? "bg-(--builder-buttons)" : ""
                        }`
                    }
                >
                    <Eye size={18} />
                    Preview
                </NavLink>
            </nav>

            <div className="flex flex-col items-start mt-auto pt-6 border-t border-white/10">
                <Link
                    to="/"
                    aria-label="Button Home Page"
                    className="flex gap-1 p-1 text-sm"
                >
                    <Home size={19} />
                    <p>Go home</p>
                </Link>
                <Link 
                    to={`/u/${slug}`} target="_blank"
                    aria-label="Button to your Public Portfolio"
                    className="flex gap-1 p-1 text-sm"
                    >
                    <ScanBarcode size={19 }/>
                    <p>Check your Portfolio</p>
                </Link>

                <p className="text-sm text-gray-300 p-1">
                    Portfolio Builder Panel
                </p>
            </div>
        </aside>
    );
}
