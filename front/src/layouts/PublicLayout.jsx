import { Outlet } from "react-router";
import {Facebook} from "lucide-react"
import {Instagram} from "lucide-react"
import {Youtube} from "lucide-react"
import {Twitter} from "lucide-react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

                <main>

                    <Outlet />

                </main>

            <Footer />
            

        </div>
    );
}
