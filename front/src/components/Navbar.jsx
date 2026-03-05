import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { LucideUserCheck2 } from "lucide-react";

export default function Navbar() {

    return (
        <nav className="fixed top-0 left-0 max-w-md flex justify-between items-center bg-purple-400 m-8 opacity-75 rounded-full px-8">

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