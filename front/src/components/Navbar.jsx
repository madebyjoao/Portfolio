import { useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { LucideUserCheck2, UserRoundXIcon, Users2 } from "lucide-react";
import handleLogout from "../utils/helpers";

export default function Navbar() {
    const token = localStorage.getItem('token');

    const [showLogout, setShowLogout] = useState(false);

    return (
        <nav role="navigation" aria-label="Main navigation" className="fixed flex justify-between items-center bg-[rgb(182,176,159)] m-8 opacity-75 rounded-full px-8 py-4 top-0 gap-4 left-0 right-0 mx-auto max-w-[calc(100%-4rem)]">
            {!token ? (
                <NavLink to="/auth/login">
                    <div className="cursor-pointer">
                        <Users2 className="text-[rgb(242,242,242)]" />
                    </div>
                </NavLink>
            ) : (
                <div
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                    className="cursor-pointer"
                    onClick={showLogout ? handleLogout : null}
                >
                    {showLogout ? (
                        <UserRoundXIcon className="text-[rgb(242,242,242)]" />
                    ) : (
                        <LucideUserCheck2 className="text-[rgb(242,242,242)]" />
                    )}
                </div>
            )}
            <NavLink to="/">
                <img className="w-14" src={logo} alt="Picture of the Logo" />
            </NavLink>

            <NavLink to="/builder" className="text-[rgb(242,242,242)]" >
                BUILDER
            </NavLink>

        </nav>
    )

}