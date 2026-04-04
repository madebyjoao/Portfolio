import { Outlet } from "react-router";
import BuilderSidebar from "../components/builder/BuilderSidebar";

export default function BuilderLayout() {
    return (
        <div className="min-h-screen flex bg-(--bg-template-builder-layout)">
            <BuilderSidebar />

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
