import { Outlet } from "react-router";
import AdminNavbar from "@/components/admin/AdminSideBar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            <AdminNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}