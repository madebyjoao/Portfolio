import React from "react";
import {
    LayoutDashboard,
    Users,
    Settings,
    FileText,
    BarChart3,
    Package,
    Clapperboard,
    Glasses,
    CalendarCheck,
    ArrowLeftFromLine,
    LogOut,
    SquareCode,
    LogIn,
} from "lucide-react";
import { Form, NavLink, useLocation } from "react-router";

import handleLogout from "@/utils/helpers";
import { ThemeToggle } from "../ThemeToggle";

const navItems = [
    { title: "Overview", url: "/admin", icon: LayoutDashboard },
    { title: "Gestion Users", url: "/admin/users", icon: Users },
    { title: "Jury", url: "/admin/jurys", icon: Glasses },
    { title: "Gestion Films", url: "/admin/videos", icon: Clapperboard },
    { title: "Evenements", url: "/admin/events", icon: CalendarCheck },
    { title: "CMS", url: "/admin/cms", icon: SquareCode },
];

export default function AdminSidebar() {
    const { pathname } = useLocation();

    return (
        <aside className="text-[rgb(242,242,242)]">
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin">
                                <div>
                                    <LayoutDashboard />
                                </div>
                                <div>
                                    <span>
                                        Greetings,{" "}
                                        {localStorage.getItem("first_name")}
                                    </span>
                                    <span>Dashboard</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <div>
                <div>
                    <label>Navigation</label>
                    <div>
                        <nav>
                            {navItems.map((item) => (
                                <div key={item.title}>
                                    <NavLink to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <footer>
                <div>
                    <div>
                        <ThemeToggle />
                    </div>
                </div>
                <nav>
                    <div>
                        <NavLink to="/">
                            <ArrowLeftFromLine />
                            <span>Back Home</span>
                        </NavLink>
                    </div>
                    <div>
                        <button onClick={handleLogout}>
                            <LogOut />
                            <span>Log out</span>
                        </button>
                    </div>
                </nav>
            </footer>
        </aside>
    );
}
