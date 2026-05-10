import { Plus, Dumbbell, Calendar, ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { WorkoutPlan } from "../schemas/workout";
import { useState } from "react";
import type { WorkoutPlanFormData } from "../schemas/workoutForm.schema";
import { CreateWorkoutSheet } from "../components/workout/CreateWorkoutSheet";

const mockPlans: WorkoutPlan[] = [
  {
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
        workoutSets: [],
      },
      {
        id: "2",
        name: "Treino B — Costas e Bíceps",
        order: 2,
        workoutSets: [],
      },
      { id: "3", name: "Treino C — Pernas", order: 3, workoutSets: [] },
    ],
  },
  {
    id: "2",
    name: "Definição Verão",
    endDate: "2026-03-01",
    status: "expired",
    createdAt: "2025-12-01",
    trainingDays: [
      { id: "4", name: "Treino A — Full Body", order: 1, workoutSets: [] },
      { id: "5", name: "Treino B — Cardio", order: 2, workoutSets: [] },
    ],
  },
  {
    id: "3",
    name: "Força Base",
    endDate: "2026-05-01",
    status: "archived",
    createdAt: "2025-10-01",
    trainingDays: [
      { id: "6", name: "Treino A — Agachamento", order: 1, workoutSets: [] },
    ],
  },
];

const statusConfig = {
  active: { label: "Ativa", classes: "bg-emerald-500/15 text-emerald-400" },
  expired: { label: "Vencida", classes: "bg-red-500/15 text-red-400" },
  archived: { label: "Arquivada", classes: "bg-white/10 text-white/40" },
};

const getDaysUntilExpiry = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const Workouts = () => {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  function handleSave(data: WorkoutPlanFormData) {
    console.log("Nova ficha:", data);
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 pt-10 pb-6 relative">
      {/* Header */}
      <div className="mb-8">
        <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-1">
          Seus planos
        </p>
        <h1 className="text-white text-2xl font-bold">Fichas de Treino</h1>
      </div>

      {/* Lista de fichas */}
      <div className="flex flex-col gap-3">
        {mockPlans.map((plan) => {
          const status = statusConfig[plan.status as keyof typeof statusConfig];
          const daysLeft = getDaysUntilExpiry(plan.endDate);

          return (
            <button
              key={plan.id}
              onClick={() => navigate(`/workouts/${plan.id}`)}
              className="w-full bg-white/5 border border-white/8 rounded-2xl p-5 text-left transition-all duration-200 active:scale-[0.98] active:bg-white/8"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/8 p-2 rounded-xl">
                    <Dumbbell size={18} className="text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base leading-tight">
                      {plan.name}
                    </h3>
                    <p className="text-white/40 text-xl mt-0.5">
                      {plan.trainingDays.length} dias de treino
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${status.classes}`}
                  >
                    {status.label}
                  </span>
                  <ChevronRight size={16} className="text-white/20" />
                </div>
              </div>
              {/* Footer do card */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-white/30 text-xs">
                  <Calendar size={12} />
                  <span>
                    {daysLeft > 0
                      ? `Expira em ${daysLeft} dias`
                      : `Expirou há ${Math.abs(daysLeft)} dias`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-white/30 text-xs">
                  <Clock size={12} />
                  <span>
                    {new Date(plan.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Botão flutuante */}
      <button
        onClick={() => setCreateOpen(true)}
        className="fixed bottom-24 right-6 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white p-4 rounded-2xl shadow-lg shadow-violet-900/40 transition-all duration-200 active:scale-95"
      >
        <Plus size={22} />
      </button>

      <CreateWorkoutSheet
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};
