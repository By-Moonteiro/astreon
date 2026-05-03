import { useNavigate } from "react-router-dom";
import { LogOut, Dumbbell, Zap, Flame, Trophy } from "lucide-react";

const mockUser = {
  name: "João Silva",
  email: "joao@email.com",
  createdAt: "2026-01-15",
};

const mockStats = {
  xp: 0,
  workoutsDone: 0,
  currentStreak: 0,
  badges: 0,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

export const Profile = () => {
  const navigate = useNavigate();

  const initials = getInitials(mockUser.name);

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 pb-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-1">
          Sua Conta
        </p>
        <h1 className="text-white text-2xl font-bold">Perfil</h1>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-2xl p-5 mb-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-violet-600/30 border border-violet-500/30 flex items-center justify-center">
            <span className="text-violet-300 text-xl font-bold tracking-tight">
              {initials}
            </span>
          </div>

          {/* Indicador online */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0d0d0f]" />
        </div>

        {/* Nome e email */}
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-lg leading-tight truncate">
            {mockUser.name}
          </h2>
          <p className="text-white/40 text-xs truncate mt-0.5">
            {mockUser.email}
          </p>
          <p className="text-white/25 text-xs mt-1">
            Desde {formatDate(mockUser.createdAt)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-violet-500/15 p-1.5 rounded-lg">
              <Zap size={14} className="text-violet-400" />
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase">
              XP Total
            </p>
          </div>
          <p className="text-white text-2xl font-bold">{mockStats.xp}</p>
          <p className="text-white/25 text-xs mt-1">pontos de experiência</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-violet-500/15 p-1.5 rounded-lg">
              <Dumbbell size={14} className="text-violet-400" />
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase">
              Treinos
            </p>
          </div>
          <p>{mockStats.workoutsDone}</p>
          <p>concluídos</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-orange-500/15 p-1.5 rounded-lg">
              <Flame size={14} className="text-orange-400" />
            </div>
            <p>Sequência</p>
          </div>
          <p className="text-white text-2xl font-bold">
            {mockStats.currentStreak}
          </p>
          <p className="text-white/25 text-xs mt-1">dias seguidos</p>
        </div>
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-amber-500/15 p-1.5 rounded-lg">
              <Trophy size={14} className="text-amber-400" />
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase">
              Badges
            </p>
          </div>
          <p className="text-white text-2xl font-bold">{mockStats.badges}</p>
          <p className="text-white/25 text-xs mt-1">conquistados</p>
        </div>
      </div>

      {/* Badges placeholder */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-4">
        <div className="flex item-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Conquistas</h3>
          <span className="text-white/30 text-xs">Em Breve</span>
        </div>
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 border-dashed flex items-center justify-center"
            >
              <Trophy size={16} className="text-white/15" />
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm py-4 rounded-2xl transition-all duration-200 active:scale-[0.98]"
      >
        <LogOut size={16} />
        Sair da conta
      </button>
    </div>
  );
};
