import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopAlert from "../components/TopAlert";
import previewVideo from "@/assets/preview.mp4";
import Styles from "@/index.module.css"
import AddsRight from "../components/AddsRight.jsx";
import AddsLeft from "../components/AddsLeft.jsx";

export default function PublicLayout() {
    const location = useLocation();
    const alertMessage = location.state?.alertMessage;

    return (
        <div className={`${Styles.GridPublic} relative`}>
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
            <header className={`${Styles.Header} `}>
                <Navbar />
            </header>
            <AddsLeft />
            <main className={`${Styles.Main} flex-1 overflow-hidden`}>
                <Outlet />
            </main>
            <AddsRight />
            <footer className={`${Styles.Footer} relative bottom-0`}>
                <Footer />
            </footer>
        </div>
    );
}
