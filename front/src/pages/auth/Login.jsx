import { Link, useLocation, useNavigate, useParams } from "react-router";
import { login } from "../../api/auth.js";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Mot de passe requis"),
});

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const alertMessage = location.state?.alertMessage;

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: async (data) => {
            return await login(data);
        },
        onSuccess: (response) => {
            localStorage.setItem("first_name", response.data.first_name);
            localStorage.setItem("last_name", response.data.last_name);
            localStorage.setItem("email", response.data?.email);
            localStorage.setItem("role", response.data?.role);
            localStorage.setItem("token", response.data?.token);
            localStorage.setItem("slug", response.data?.slug);

            switch (response.data?.role) {
                case "ADMIN":
                    navigate("/admin");
                    break;
                case "CLIENT":
                    navigate("/");
                    break;
                default:
                    navigate("/");
                    break;
            }
        },
        onError: (error) => {
            console.error("Login error:", error);
            console.error("Error response:", error.response);

            if (error.code === "ERR_NETWORK") {
                alert(
                    "Impossible de contacter le serveur. Vérifiez que le backend est démarré.",
                );
            } else if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else if (error.message) {
                alert(`Erreur: ${error.message}`);
            } else {
                alert("Erreur lors de la connexion");
            }
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    // ====================
    const quickLogin = (email, password) => {
        loginMutation.mutate({ email, password });
    };
    // ======================

    return (
        <>
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-col w-full sm:w-120 px-6 py-121 box-border m-4 gap-3">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="h-full flex flex-col gap-5"
                    >
                        <h2 className="text-center text-[36px] sm:text-[48px] font-bold text-(--text-website)">
                            CONNECTION
                        </h2>
                            
                        <div className="w-full mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                            <p className="text-[10px] text-yellow-500 mb-3 text-center tracking-[2px]">
                                DEMO QUICK LOGIN
                            </p>
                            <div className="flex gap-2 flex-wrap justify-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        quickLogin(
                                            "joao-port@test.com",
                                            "123456",
                                        )
                                    }
                                    disabled={loginMutation.isPending}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold tracking-[1.5px] transition-colors disabled:opacity-50"
                                >
                                    Joao Port
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        quickLogin(
                                            "joao@test.com",
                                            "123456",
                                        )
                                    }
                                    disabled={loginMutation.isPending}
                                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-[10px] font-bold tracking-[1.5px] transition-colors disabled:opacity-50"
                                >
                                    Joao
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        quickLogin(
                                            "admin@mbjtest.com",
                                            "123456",
                                        )
                                    }
                                    disabled={loginMutation.isPending}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold tracking-[1.5px] transition-colors disabled:opacity-50"
                                >
                                    ADMIN
                                </button>
                            </div> 
                        </div>
                        
                        <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                            <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                group-focus-within:max-w-full group-focus-within:px-1
                                group-[:has(input:not(:placeholder-shown))]:max-w-full
                                group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                Enter your Email
                            </legend>
                            <input
                                id="email"
                                type="email"
                                placeholder=""
                                {...register("email")}
                                className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                            >
                                Enter your Email
                            </label>
                        </fieldset>
                        <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                            <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                group-focus-within:max-w-full group-focus-within:px-1
                                group-[:has(input:not(:placeholder-shown))]:max-w-full
                                group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                Enter your Password
                            </legend>
                            <input
                                id="password"
                                type="password"
                                placeholder=""
                                {...register("password")}
                                className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                            >
                                Enter your Password
                            </label>
                        </fieldset>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="flex justify-center items-center gap-4.25 text-gray-300 py-3 font-bold w-full border rounded-md border-gray-500 backdrop-blur bg-black/30 cursor-pointer"
                        >
                            {" "}
                            <Send size={20} />
                            <h2>
                                {loginMutation.isPending
                                    ? "Connecting..."
                                    : "Log In"}
                            </h2>
                        </button>
                        
                        
                    </form>
                    <a
                        href="/auth/register"
                        className="flex items-center sm:items-end flex-col sm:flex-row w-full gap-3.75 justify-center pb-10"
                    >
                        <button className="text-[11px] text-[rgb(255,255,255)] tracking-[2.2px] cursor-pointer">
                            Create a new account
                        </button>
                    </a>
                </div>
            </div>

        </>
    );
}
