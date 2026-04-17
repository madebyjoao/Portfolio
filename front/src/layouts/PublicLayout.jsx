import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopAlert from "../components/TopAlert";
import previewVideo from "@/assets/preview.mp4";

export default function PublicLayout() {
    const location = useLocation();
    const alertMessage = location.state?.alertMessage;

    return (
        <div className="relative h-screen flex flex-col w-screen ">
            <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Preview video showing app functionality"
                >
                    <source src={previewVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <TopAlert message={alertMessage} />
            <Navbar />

            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
