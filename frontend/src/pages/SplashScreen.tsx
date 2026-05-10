import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MoonLogo } from "@/components/MoonLogo";

export function SplashScreen() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      if (user) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading, user]);

  return (
    <div className="relative min-h-screen bg-[#07050f] flex flex-col items-center justify-center overflow-hidden">
      {/* Fundo — glow roxo central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-violet-700/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Estrelas — pontos brancos espalhados */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "8%", left: "15%", size: "w-1 h-1", delay: "0s" },
          { top: "12%", left: "75%", size: "w-1.5 h-1.5", delay: "0.5s" },
          { top: "20%", left: "40%", size: "w-1 h-1", delay: "1s" },
          { top: "25%", left: "85%", size: "w-1 h-1", delay: "1.5s" },
          { top: "35%", left: "8%", size: "w-1.5 h-1.5", delay: "0.3s" },
          { top: "45%", left: "92%", size: "w-1 h-1", delay: "0.8s" },
          { top: "60%", left: "20%", size: "w-1 h-1", delay: "1.2s" },
          { top: "65%", left: "60%", size: "w-1.5 h-1.5", delay: "0.6s" },
          { top: "70%", left: "80%", size: "w-1 h-1", delay: "1.8s" },
          { top: "75%", left: "35%", size: "w-1 h-1", delay: "0.4s" },
          { top: "82%", left: "70%", size: "w-1.5 h-1.5", delay: "1.1s" },
          { top: "88%", left: "10%", size: "w-1 h-1", delay: "0.9s" },
          { top: "15%", left: "55%", size: "w-1 h-1", delay: "1.4s" },
          { top: "50%", left: "5%", size: "w-1 h-1", delay: "1.7s" },
          { top: "90%", left: "45%", size: "w-1 h-1", delay: "0.2s" },
        ].map((star, i) => (
          <div
            key={i}
            className={`absolute ${star.size} bg-white rounded-full`}
            style={{
              top: star.top,
              left: star.left,
              animation: `pulse 2s ease-in-out ${star.delay} infinite`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Conteúdo central */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div className="w-64">
          <MoonLogo />
        </div>

        <h1 className="text-5xl font-bold bg-linear-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent tracking-tight">
          MoonFit
        </h1>

        <p className="text-white/30 text-sm tracking-widest uppercase">
          Sua jornada começa aqui
        </p>

        {/* Loading dots */}
        <div className="flex gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-violet-500 rounded-full"
              style={{
                animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-violet-800/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
