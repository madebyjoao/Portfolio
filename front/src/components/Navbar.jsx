import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { LucideUserCheck2 } from "lucide-react";

export default function Navbar() {

    return (
        <nav role="navigation" aria-label="Main navigation" className="fixed flex justify-between items-center bg-purple-400 m-8 opacity-75 rounded-full px-8 py-4 top-0 gap-4 left-0 right-0 mx-auto max-w-[calc(100%-4rem)]">

            <NavLink to="/auth/login">
                <LucideUserCheck2 />
            </NavLink>

            <NavLink to="/">
                <img className="w-14" src={logo} alt="Picture of the Logo" />
            </NavLink>

            <NavLink to="">
                Build IT
            </NavLink>

        </nav>
    )

}