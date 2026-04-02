import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopAlert from "../components/TopAlert";

export default function PublicLayout() {
    const location = useLocation();
    const alertMessage = location.state?.alertMessage;

    return (
        <div className="min-h-screen flex flex-col">
            <TopAlert message={alertMessage} />
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
