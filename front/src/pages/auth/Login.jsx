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
      localStorage.setItem('slug', response.data?.slug);

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

  return (
    <>
      <div className="w-full pt-42.5">
        <div className="flex flex-col items-center uppercase text-[rgb(255,255,255)] w-full max-w-137.5 mx-auto bg-[rgb(24,61,61)] border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(24,61,61,0.5)]">
          <form 
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 max-w-125 my-0 mx-auto sm:p-14">

            <h2 className="text-center text-[36px] sm:text-[48px] mb-2.75 font-bold inline-block bg-[rgb(255,255,255)] bg-clip-text text-transparent tracking-[-2.4px]">
              Connection
            </h2>

            <h2 className="w-full text-[10px] mb-3 tracking-[2px]">
              Username
            </h2>
            <div className="flex bg-black/40 border border-white/10 rounded-[28px] w-full mb-6">
              <img
                className="flex items-center px-3.75"
                src="/src/assets/login_svg/Icon (2).svg"
                alt=""
              />
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                className="w-full h-14 outline-none  placeholder-white"
              />
            </div>

            <h2 className="w-full text-[10px] mb-3 tracking-[2px]">
              Password
            </h2>
            <div className="flex bg-black/40 border border-white/10 rounded-[28px] w-full">
              <img
                className="flex items-center px-3.75"
                src="/src/assets/login_svg/Icon (2).svg"
                alt=""
              />
              <input
                id="password"
                type="password"
                placeholder="●●●●●●"
                className="w-full h-14 outline-none  placeholder-white"
                {...register("password")}
                required
              />
            </div>

            <div className="flex text-[10px] items-center w-full py-8 gap-2.5 tracking-[1px]">

              <label className="relative inline-flex items-center cursor-pointer -mb-px">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 rounded-full border border-white/10 bg-black/40 flex items-center justify-center transition-colors duration-200 peer-checked:bg-[rgb(0,255,150)]">
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </label>

              <h2 className="mr-auto tracking-[1px]">Keep me logged</h2>
              <h2 className="text-[rgb(255,255,255)] tracking-[2px]  cursor-pointer">
                Reset ?
              </h2>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="flex justify-center items-center gap-4.25 font-bold w-full bg-[rgb(92,131,116)] text-[rgb(255,255,255)] rounded-[28px] tracking-[2.75px] uppercase text-[11px] h-19 trackincg-[2.75px]  cursor-pointer"
            >
              {" "}
              <Send size={20} />
              <h2>
                {loginMutation.isPending ? "Connecting..." : "Initialiser Flux"}
              </h2>
            </button>
          </form>
          <a href="/auth/register" className="flex items-center sm:items-end flex-col sm:flex-row w-full gap-3.75 justify-center pb-10">
            <button className="text-[11px] text-[rgb(255,255,255)] tracking-[2.2px] cursor-pointer">
              Create a new account
            </button>
          </a>
        </div>
      </div>
      

    </>
  );
}
