import { useState } from "react";
import { NavLink, useParams } from "react-router";
import logo from "../assets/logo.svg";

import { LucideUserCheck2, UserRoundXIcon, Users2 } from "lucide-react";
import { handleLogout } from "@/utils/helpers";

export default function Navbar() {
    const token = localStorage.getItem("token");

    const [showLogout, setShowLogout] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex justify-between items-stretch min-h-20 w-full px-7 top-0 gap-4 left-0 right-0 relative backdrop-blur bg-white/1 "
        >
            <NavLink
                to="/"
                className="flex w-16 h-16 sm:w-40 sm:h-40 top-0"
            >
                <img
                    className="w-16 h-16 sm:w-40 sm:h-40 object-fill"
                    src={logo}
                    alt="Picture of the Logo"
                />
            </NavLink>
            <div className="flex justify-between items-stretch gap-10 box-border">

                <NavLink
                    to="/builder"
                    onMouseEnter={() => setShowLogout(false)}
                    className="flex items-center text-(--text-website) text-[26px] font-bold px-2 py-1 hover:bg-white/10 hover:border-r-white hover:border-l-white"
                >
                    BUILDER
                </NavLink>

                {!token ? (
                    <NavLink to="/auth/login" className="flex">
                        <div className="flex items-center justify-center cursor-pointer box-border text-(--text-website) p-2 h-full sm:w-50 hover:bg-white/10 hover:border-r-white/20 hover:border-l-white/20 text-[18px] sm:text-[26px] font-bold">
                            <Users2
                                aria-label="Login page"
                                color="white"
                                strokeWidth={3}
                            />
                        </div>
                    </NavLink>
                ) : 
                (
                    <div
                        onMouseEnter={() => setShowLogout(true)}
                        onMouseLeave={() => setShowLogout(false)}
                        className="relative flex items-center justify-center text-(--text-website) gap-3 p-2 text-[18px] sm:text-[26px] font-bold sm:w-60 hover:bg-white/10 hover:border-r-white hover:border-l-white"
                    >
                       
                        <div className={`flex items-center gap-3 transition-opacity duration-500 ${showLogout ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <p>Welcome, {localStorage.getItem("first_name")}</p>
                            <LucideUserCheck2 color="white" strokeWidth={3} />
                        </div>

                        
                        <div className={`absolute flex flex-col gap-2 w-full transition-opacity duration-500 ${showLogout ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <button
                                className="flex items-center justify-start mx-2 w-[calc(full-8px)] text-left py-2 text-red-400 hover:bg-white/20 cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <div className="flex items-center justify-start gap-3 mx-2 cursor-default">
                                <p>Welcome, {localStorage.getItem("first_name")}</p>
                                <LucideUserCheck2 color="white" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                )
                
            }

            </div>

        </nav>
    );
}

{/*

(
    <div
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
        className="flex items-center justify-center text-(--text-website) gap-3 p-2 text-[18px] sm:text-[26px] hover:bg-white/10 hover:border-r-white/20 hover:border-l-white/20 font-bold cursor-pointer"
        onClick={showLogout ? handleLogout : null}
    >
        {showLogout ? (
            <div className="flex flex-col >
                <div>
                    <p>Welcome, {localStorage.getItem("first_name")}</p>
                    <LucideUserCheck2 color="white" strokeWidth={3} />
                </div>
                <div>       
                    <p className="text-red-500">GoodBye, {localStorage.getItem("first_name")}</p>
                    <UserRoundXIcon color="red" strokeWidth={3} />
                </div>

            </div>
        ) : (
            <>
                <p>Welcome, {localStorage.getItem("first_name")}</p>
                <LucideUserCheck2 color="white" strokeWidth={3} />
            </>
        )}
    </div>
)  */} 