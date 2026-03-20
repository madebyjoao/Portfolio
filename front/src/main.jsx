import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Home from "./pages/public/Home.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import { Login } from "./pages/auth/Login.jsx";
import { Register } from "./pages/auth/Register.jsx";
import { RoleGuard } from "./middlewares/RoleGuard.jsx";
import Users from "./pages/admin/Users.jsx";
import Contact from "./pages/public/Contact.jsx";
import Cms from "./pages/admin/Cms.jsx";
import Builder from "./pages/builder/Builder.jsx";
import BuilderLayout from "./layouts/BuilderLayout.jsx";
import Portfolio from "./pages/public/Portfolio.jsx";
import Certificates from "./pages/public/Certificates.jsx";
import PortfolioLayout from "./layouts/PortfolioLayout.jsx";




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Routes>

			{/* Routes publiques */}
			<Route path="/" element={<PublicLayout />}>
				<Route index element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
			</Route >

			{/* Routes portfolio */}
			<Route path="/u" element={<PortfolioLayout />}>
				<Route path=":slug" element={<Portfolio />} />
				<Route path=":slug/certificates" element={<Certificates />} />
			</Route>

			{/* Routes privées */}
			<Route path="/builder" element={ <RoleGuard allowedRoles={["ADMIN", "CLIENT"]}>
												<BuilderLayout />
											</RoleGuard>}>

				<Route index element={<Builder />}/>
			</Route>

			<Route path="admin" element={ 	<RoleGuard allowedRoles={["ADMIN"]}>
												<AdminLayout />
										 	</RoleGuard> }>
				<Route index element={<Dashboard />} />
				<Route path="users" element={<Users />} />
				<Route path="cms" element={<Cms />} />
			</Route>

			</Routes>
		</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>,
);
