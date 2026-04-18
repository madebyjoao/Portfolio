import { useState } from "react";
import { NavLink, useParams } from "react-router";
import logo from "../assets/logo.png";
import { LucideUserCheck2, UserRoundXIcon, Users2 } from "lucide-react";
import handleLogout from "../utils/helpers";

export default function Navbar() {
    const token = localStorage.getItem("token");

    const [showLogout, setShowLogout] = useState(false);

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex justify-between items-stretch min-h-20 w-full px-7 top-0 gap-4 left-0 right-0 relative backdrop-blur bg-white/1 hover:border-b-white hover:border-b-2 box-border"
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
                    className="flex items-center text-(--text-website) text-[26px] font-bold px-2 py-1 hover:bg-white/10 hover:border-r-white hover:border-l-white"
                >
                    BUILDER
                </NavLink>

                {!token ? (
                    <NavLink to="/auth/login" className="flex">
                        <div className="flex items-center justify-center cursor-pointer box-border text-(--text-website) p-2 h-full hover:bg-white/10 hover:border-r-white/20 hover:border-l-white/20 text-[18px] sm:text-[26px] font-bold">
                            <Users2
                                aria-label="Login page"
                                color="white"
                                strokeWidth={3}
                            />
                        </div>
                    </NavLink>
                ) : (
                    <div
                        onMouseEnter={() => setShowLogout(true)}
                        onMouseLeave={() => setShowLogout(false)}
                        className="flex items-center justify-center text-(--text-website) gap-3 p-2 text-[18px] sm:text-[26px] hover:bg-white/10 hover:border-r-white/20 hover:border-l-white/20 font-bold cursor-pointer"
                        onClick={showLogout ? handleLogout : null}
                    >
                        {showLogout ? (
                            <>
                                <p className="text-red-500">GoodBye, {localStorage.getItem("first_name")}</p>
                                <UserRoundXIcon color="red" strokeWidth={3} />
                            </>
                        ) : (
                            <>
                                <p>Welcome, {localStorage.getItem("first_name")}</p>
                                <LucideUserCheck2 color="white" strokeWidth={3} />
                            </>
                        )}
                    </div>
                )}

            </div>

        </nav>
    );
}
