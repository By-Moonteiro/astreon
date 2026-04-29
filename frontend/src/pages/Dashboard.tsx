import { Calendar, ChevronRight, Dumbbell, Zap } from "lucide-react";
import type { TrainingDay, WorkoutPlan } from "../schemas/workout";

const mockPlan: WorkoutPlan = {
  id: "1",
  name: "Hipertrofia Vol.1",
  endDate: "2026-08-01",
  status: "active",
  createdAt: "2026-01-01",
  trainingDays: [
    {
      id: "1",
      name: "Treino A — Peito e Tríceps",
      order: 1,
      workoutSets: [
        {
          id: "1",
          order: 1,
          repetitions: 12,
          weight: 80,
          restTime: 60,
          exercise: {
            id: "1",
            name: "Supino Reto",
            muscleGroup: "Peito",
            executionMediaUrl: "",
          },
        },
        {
          id: "2",
          order: 2,
          repetitions: 10,
          weight: 60,
          restTime: 60,
          exercise: {
            id: "2",
            name: "Tríceps Corda",
            muscleGroup: "Tríceps",
            executionMediaUrl: "",
          },
        },
        {
          id: "3",
          order: 3,
          repetitions: 12,
          weight: 70,
          restTime: 60,
          exercise: {
            id: "3",
            name: "Crucifixo",
            muscleGroup: "Peito",
            executionMediaUrl: "",
          },
        },
      ],
    },
    {
      id: "2",
      name: "Treino B — Costas e Bíceps",
      order: 2,
      workoutSets: [],
    },
    {
      id: "3",
      name: "Treino C — Pernas",
      order: 3,
      workoutSets: [],
    },
  ],
};

const getNextTrainingDay = (plan: WorkoutPlan): TrainingDay => {
  return plan.trainingDays.sort((a, b) => a.order - b.order)[0];
};

const getDaysUntilExpiry = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();

  return Math.ceil((end.getTime() - now.getTime()) / (100 * 60 * 60 * 24));
};

export const Dashboard = () => {
  const plan = mockPlan;
  const nextDay = getNextTrainingDay(plan);
  const daysLeft = getDaysUntilExpiry(plan.endDate);
  const userEmail = "voce@email.com";

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 pt-10 pb-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-1">
          Bem-vindo de volta
        </p>
        <h1 className="text-white text-2xl font-bold truncate">{userEmail}</h1>
      </div>

      {/* Card - Treino de Hoje */}
      <div className="relative bg-violet-600/10 border border-violet-500/20 rounded-2xl p-5 mb-4 overflow-hidden">
        {/* Glow do fundo */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-1">
              Próximo treino
            </p>
            <h2 className="text-white text-lg font-bold leading-tight">
              {nextDay.name}
            </h2>
          </div>
          <div className="bg-violet-600/20 p-2 rounded-xl">
            <Zap size={18} className="text-violet-400" />
          </div>
        </div>

        <p className="text-white/40 text-sm mb-4">
          {nextDay.workoutSets.length} exercícios
        </p>

        <button className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
          Iniciar treino
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Card — Ficha Ativa */}
      <div className="bg-white/5 border border-white/8 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/8 p-2 rounded-xl">
              <Dumbbell size={18} className="text-white/60" />
            </div>
            <div>
              <p className="text-white/40 text-xs -tracking-widest uppercase">
                Ficha ativa
              </p>
              <h3 className="text-white font-semibold text-sm">{plan.name}</h3>
            </div>
          </div>
          <span className="bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
            Ativa
          </span>
        </div>

        <div className="flex items-center gap-2 text-white/30 text-xs">
          <Calendar size={12} />
          <span>
            {daysLeft > 0 ? `Expire in ${daysLeft} days` : "Expired workout"}
          </span>
        </div>
      </div>

      {/* Cards de status */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
            Treinos
          </p>
          <p className="text-white text-2xl font-bold">
            {plan.trainingDays.length}
          </p>
          <p className="text-white/30 text-xs mt-1">na ficha atual</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
            Dias restantes
          </p>
          <p
            className={`text-2xl font-bold ${daysLeft <= 7 ? "text-amber-400" : "text-white"}`}
          >
            {daysLeft}
          </p>
          <p className="text-white/30 text-xs mt-1">até expirar</p>
        </div>
      </div>
    </div>
  );
};
