import { NavLink } from "react-router";
import { LogOut, ArrowLeftFromLine } from "lucide-react";
import { handleLogout } from "@/utils/helpers";

const tabs = [
    { label: "Overview", url: "/admin" },
    { label: "Utilisateurs", url: "/admin/users" },
    { label: "Portfolios", url: "/admin/portfolios" },
];

export default function AdminNavbar() {
    return (
        <header className="sticky top-0 z-40 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center justify-between px-6 h-14">
                <span className="text-white font-semibold text-sm tracking-tight">
                    madebyJoao<span className="text-zinc-400">TM</span>
                </span>

                <nav className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.url}
                            to={tab.url}
                            end={tab.url === "/admin"}
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded-lg text-sm transition-colors ${
                                    isActive
                                        ? "bg-zinc-800 text-white font-medium"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                }`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <NavLink
                        to="/"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
                    >
                        <ArrowLeftFromLine size={14} />
                        Home
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-red-400 transition-colors rounded-lg hover:bg-zinc-800/50"
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}