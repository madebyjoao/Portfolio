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
            className="flex justify-between items-center bg-[rgb(24,61,61)] m-8 rounded-full px-7 py-2,5 top-0 gap-4 left-0 right-0 w-full py-4 mx-auto max-w-[calc(100%-4rem)] shadow-[0_0_50px_rgba(24,61,61,0.7)] relative"
        >
            {!token ? (
                <NavLink to="/auth/login">
                    <div className="cursor-pointer border-white/20 rounded-full p-2 backdrop-blur-md bg-white/10 shadow-lg">
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
                    className="flex items-center border-white/20 rounded-full gap-3 p-2 backdrop-blur-md bg-white/10 shadow-lg text-[rgb(255,255,255)] font-bold cursor-pointer"
                    onClick={showLogout ? handleLogout : null}
                >
                    {showLogout ? (
                        <>
                            <UserRoundXIcon color="red" strokeWidth={3} />
                            <p className="text-red-500">GoodBye, {localStorage.getItem("first_name")}</p>
                        </>
                    ) : (
                        <>
                            <LucideUserCheck2 color="white" strokeWidth={3} />
                            <p>Welcome, {localStorage.getItem("first_name")}</p>
                        </>
                    )}
                </div>
            )}
            <NavLink
                to="/"
                className="absolute flex bg-[rgb(24,61,61)] left-1/2 -translate-x-1/2 border-double rounded-full p-5 w-24 h-24"
            >
                <img
                    className="w-24 h-16 object-fill"
                    src={logo}
                    alt="Picture of the Logo"
                />
            </NavLink>

            <NavLink
                to="/builder"
                className="text-[rgb(255,255,255)] text-[26px] font-bold border-white/20 rounded-full px-2 py-1 backdrop-blur-md bg-white/10 shadow-lg"
            >
                BUILDER
            </NavLink>
        </nav>
    );
}
