import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginData } from "@/schemas/login.schema";
import { api } from "@/lib/axios";
import { AuthTabs } from "@/components/AuthTabs";
import { MoonLogo } from "@/components/MoonLogo";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (data: LoginData) => api.post("/auth/login", data),
  });

  async function onSubmit(data: LoginData) {
    try {
      await mutateAsync(data);
      navigate("/dashboard");
    } catch {}
  }

  return (
    <div className="relative min-h-screen bg-[#07050f] flex flex-col overflow-hidden">
      {/* Glow roxo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 px-6 pt-18 pb-10 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="w-78 mb-4">
            <MoonLogo />
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-1">
            Bem-vindo de volta
          </h1>
          <p className="text-white/40 text-sm text-center">
            Entre na sua conta para continuar
          </p>
        </div>

        <AuthTabs />

        {isError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mt-4">
            <p className="text-red-400 text-sm">Email ou senha incorretos.</p>
          </div>
        )}

        <form
          className="flex flex-col gap-4 mt-6 flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                {...register("email")}
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 focus:border-violet-500/60 text-white rounded-2xl pl-11 pr-4 py-4 outline-none transition-colors duration-200 placeholder:text-white/20 text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-red-400 text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-2 block">
              Senha
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 focus:border-violet-500/60 text-white rounded-2xl pl-11 pr-12 py-4 outline-none transition-colors duration-200 placeholder:text-white/20 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-400 text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Botão */}
          <div className="flex-1 flex items-end pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 active:scale-[0.98] text-white font-semibold py-4 rounded-2xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-violet-900/40"
            >
              {isPending ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
