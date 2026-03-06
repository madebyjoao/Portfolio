import { Outlet } from "react-router";
import {Facebook} from "lucide-react"
import {Instagram} from "lucide-react"
import {Youtube} from "lucide-react"
import {Twitter} from "lucide-react"
import BuilderSidebar from "../components/BuilderSidebar";

export default function BuilderLayout() {

    return (
        <div className="min-h-screen flex">
            <BuilderSidebar />

                <main>

                    <Outlet />

                </main>
            
        </div>
    );
}
