import { Outlet } from "react-router";
import BuilderSidebar from "../components/builder/BuilderSidebar";

export default function BuilderLayout() {

    return (
        <div className="min-h-screen flex bg-[rgb(147,177,166)]">
            <BuilderSidebar />

                <main className="flex-1 p-6">

                    <Outlet />

                </main>
            
        </div>
    );
}
