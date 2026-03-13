import { useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { LucideUserCheck2, UserRoundXIcon, Users2 } from "lucide-react";
import handleLogout from "../utils/helpers";

export default function Navbar() {
    const token = localStorage.getItem('token');

    const [showLogout, setShowLogout] = useState(false);


    return (
        <nav role="navigation" aria-label="Main navigation" className="fixed flex justify-between items-center bg-[rgb(24,61,61)] m-8 rounded-full px-7 py-2,5 top-0 gap-4 left-0 right-0 mx-auto max-w-[calc(100%-4rem)] shadow-[0_0_30px_rgba(24,61,61,0.7)]">
            {!token ? (
                <NavLink to="/auth/login">
                    <div className="cursor-pointer  border-white/20 rounded-full p-2 backdrop-blur-md bg-white/10 shadow-lg">
                        <Users2 aria-label="Login page" color="white" strokeWidth={3} />
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
                        <UserRoundXIcon color="red" strokeWidth={3} />
                    ) : (
                        <>
                            <LucideUserCheck2 color="white" strokeWidth={3}/>
                            <p>Welcome, {localStorage.getItem("first_name")}</p>
                        </>
                    )}
                </div>
            )}
            <NavLink to="/">
                <img className="w-14" src={logo} alt="Picture of the Logo" />
            </NavLink>

            <NavLink to="/builder" className="text-[rgb(255,255,255)] text-[26px] font-bold border-white/20 rounded-full px-2 py-1 backdrop-blur-md bg-white/10 shadow-lg" >
                BUILDER
            </NavLink>

        </nav>
    )

}