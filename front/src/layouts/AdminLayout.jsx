import { NavLink, Outlet } from "react-router";
import AdminSidebar from "@/components/admin/AdminSideBar";

export default function AdminLayout({ children }) {
    return (
        <div>
            <AdminSidebar />
            <main>
                {children}
                <Outlet />
            </main>
        </div>
    );
}
