import { Link, NavLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "../../api/auth.js";
import { LogIn, Send } from "lucide-react";
import { UserPlus } from "lucide-react";


// Schéma de validation Zod
const registerSchema = z
    .object({
        first_name: z.string().min(1, "Le prénom est requis"),
        last_name: z.string().min(1, "Le nom est requis"),
        email: z.string().email("Email invalide"),
        slug: z.string().min(1, "Le slug est requis"),
        password: z
            .string()
            .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
        confirmpassword: z.string(),
    })
    .refine((data) => data.password === data.confirmpassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmpassword"],
    });

export function Register() {
    const navigate = useNavigate();

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    // Mutation pour appeler le backend
    const registerMutation = useMutation({
        mutationFn: async (data) => {
            // Envoi au backend
            return await signIn({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                slug: data.slug,
            });
        },
        onSuccess: (res) => {
            alert(res.data.message);
            navigate("/auth/login"); // redirection après inscription
        },
        onError: (err) => {
            alert(err.response?.data?.error || "Une erreur est survenue");
        },
    });

    // Fonction appelée au submit
    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    // Si déjà connecté
    if (localStorage.getItem("first_name")) {
        return (
            <>
                <h1 className="text-2xl">
                    You are already logged in as{" "}
                    {localStorage.getItem("first_name")}
                </h1>
                <Link to="/">Go to Home</Link>
            </>
        );
    }

    return (
        <>
            <div className="h-full flex items-center justify-center lg:w-260" >
                <div className="flex flex-col w-full px-6 py-121 box-border m-4 gap-3">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="h-full flex flex-col gap-5 justify-center items-center"
                    >
                        <h2 className="text-center text-[36px] sm:text-[48px] font-bold text-(--text-website)">
                            REGISTER
                        </h2>

                        <div className="flex flex-col sm:flex-row justify-center content-around gap-5 w-full">                          
                            <div className="flex flex-col gap-5 w-1/2">

                                <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                                    <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                        group-focus-within:max-w-full group-focus-within:px-1
                                        group-[:has(input:not(:placeholder-shown))]:max-w-full
                                        group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                        Enter a valid Email
                                    </legend>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder=""
                                        {...register("email")}
                                        required
                                        className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                        peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                                    >
                                        Enter a valid Email
                                    </label>
                                </fieldset>
                                <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                                    <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                        group-focus-within:max-w-full group-focus-within:px-1
                                        group-[:has(input:not(:placeholder-shown))]:max-w-full
                                        group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                        Enter a valid Password
                                    </legend>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder=""
                                        {...register("password")}
                                        required
                                        className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                        peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                                    >
                                        Enter a valid Password
                                    </label>
                                </fieldset>
                                <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                                    <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                        group-focus-within:max-w-full group-focus-within:px-1
                                        group-[:has(input:not(:placeholder-shown))]:max-w-full
                                        group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                        Confirm your Password
                                    </legend>
                                    <input
                                        id="condirm_password"
                                        type="password"
                                        placeholder=""
                                        {...register("confirmpassword")}
                                        required
                                        className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                                    />
                                    <label
                                        htmlFor="confirm_password"
                                        className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                        peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                                    >
                                        Confirm your Password
                                    </label>
                                </fieldset>

                            </div>
                            <div className="flex flex-col gap-5 w-1/2">

                                <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                                    <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                        group-focus-within:max-w-full group-focus-within:px-1
                                        group-[:has(input:not(:placeholder-shown))]:max-w-full
                                        group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                        Enter a your first name
                                    </legend>
                                    <input
                                        id="first_name"
                                        type="text"
                                        placeholder=""
                                        {...register("first_name")}
                                        required
                                        className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                                    />
                                    <label
                                        htmlFor="first_name"
                                        className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                        peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                                    >
                                        Enter your first name
                                    </label>
                                </fieldset>
                                <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                                    <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                        group-focus-within:max-w-full group-focus-within:px-1
                                        group-[:has(input:not(:placeholder-shown))]:max-w-full
                                        group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                        Enter your Last Name
                                    </legend>
                                    <input
                                        id="last_name"
                                        type="text"
                                        placeholder=""
                                        {...register("last_name")}
                                        required
                                        className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                                    />
                                    <label
                                        htmlFor="last_name"
                                        className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                        peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                                    >
                                        Enter your Last Name
                                    </label>
                                </fieldset>
                                <fieldset className="group relative w-full border rounded-md border-gray-500 backdrop-blur bg-black/30">
                                    <legend className="ml-2 text-xs max-w-0 overflow-hidden whitespace-nowrap transition-all
                                        group-focus-within:max-w-full group-focus-within:px-1
                                        group-[:has(input:not(:placeholder-shown))]:max-w-full
                                        group-[:has(input:not(:placeholder-shown))]:px-1 text-transparent">
                                        Enter an Unique Slug
                                    </legend>
                                    <input
                                        id="slug"
                                        type="text"
                                        placeholder=""
                                        {...register("slug")}
                                        required
                                        className="peer w-full p-3 outline-none bg-transparent text-(--text-website)"
                                    />
                                    <label
                                        htmlFor="slug"
                                        className="absolute left-2 top-5.5 text-xs px-1 text-gray-500 transition-all
                                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                                        peer-focus:-top-4.5 peer-focus:text-xs peer-focus:text-gray-300
                                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                                    >
                                        Enter an Unique Slug
                                    </label>
                                </fieldset>

                            </div>
                        </div>
                        <div>
                            <input
                                id="tos"
                                type="checkbox"
                                className=""
                                required
                            />
                            <label htmlFor="tos">
                                I accept all the terms and conditions
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="flex justify-center items-center w-1/2 gap-4.25 text-gray-300 py-3 font-bold p-10 border rounded-md border-gray-500 backdrop-blur bg-black/30 cursor-pointer"
                        >
                            {" "}
                            <Send size={20} />
                            <h2>
                                {registerMutation.isPending
                                    ? "Connecting..."
                                    : "Create account"}
                            </h2>
                        </button>

                        
                        
                    </form>
                    <div                        
                        className="flex items-center sm:items-end flex-col sm:flex-row w-full gap-3.75 justify-center pb-10"
                    >
                        <span className="text-[11px] text-[rgb(255,255,255)] tracking-[2.2px] cursor-default">Already have an account?</span>
                        <a
                        href="/auth/login" className="text-[11px] text-[rgb(255,255,255)] tracking-[2.2px] cursor-pointer">
                            Log In
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}

 