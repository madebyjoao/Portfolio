import { Outlet } from "react-router";
import BuilderSidebar from "../components/builder/BuilderSidebar";
import builderVideo from "@/assets/builder.mp4";

export default function BuilderLayout() {
    return (
        <div className="h-screen flex">
             <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Preview video showing app functionality"
                >
                    <source src={builderVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <BuilderSidebar />

            <main className=" flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
