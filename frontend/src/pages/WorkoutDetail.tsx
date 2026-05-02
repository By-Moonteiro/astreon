import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Dumbbell, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import type { WorkoutPlan } from "../schemas/workout";

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
          weight: 40,
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
          restTime: 90,
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
      workoutSets: [
        {
          id: "4",
          order: 1,
          repetitions: 10,
          weight: 70,
          restTime: 90,
          exercise: {
            id: "4",
            name: "Remada Curvada",
            muscleGroup: "Costas",
            executionMediaUrl: "",
          },
        },
        {
          id: "5",
          order: 2,
          repetitions: 12,
          weight: 20,
          restTime: 60,
          exercise: {
            id: "5",
            name: "Rosca Direta",
            muscleGroup: "Bíceps",
            executionMediaUrl: "",
          },
        },
      ],
    },
    {
      id: "3",
      name: "Treino C — Pernas",
      order: 3,
      workoutSets: [
        {
          id: "6",
          order: 1,
          repetitions: 8,
          weight: 100,
          restTime: 120,
          exercise: {
            id: "6",
            name: "Agachamento Livre",
            muscleGroup: "Quadríceps",
            executionMediaUrl: "",
          },
        },
        {
          id: "7",
          order: 2,
          repetitions: 12,
          weight: 60,
          restTime: 90,
          exercise: {
            id: "7",
            name: "Leg Press",
            muscleGroup: "Quadríceps",
            executionMediaUrl: "",
          },
        },
        {
          id: "8",
          order: 3,
          repetitions: 15,
          weight: 30,
          restTime: 60,
          exercise: {
            id: "8",
            name: "Panturrilha",
            muscleGroup: "Panturrilhas",
            executionMediaUrl: "",
          },
        },
      ],
    },
  ],
};

const statusConfig = {
  active: { label: "Ativa", classes: "bg-emerald-500/15 text-emerald-400" },
  expired: { label: "Vencida", classes: "bg-red-500/15 text-red-400" },
  archived: { label: "Arquivada", classes: "bg-white/10 text-white/40" },
};

export const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const plan = mockPlan;
  const status = statusConfig[plan.status as keyof typeof statusConfig];

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 pt-10 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/5 border border-white/8 p-2 rounded-xl transition-all duration-200 active:scale-95"
        >
          <ArrowLeft size={18} className="text-white/60" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-white text-xl font-bold truncate">{plan.name}</h1>
          <p className="text-white/40 text-xs mt-0.5">
            {plan.trainingDays.length} dias de treino
          </p>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${status.classes}`}
        >
          {status.label}
        </span>
      </div>

      {/* Dias de treino */}
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {plan.trainingDays
          .sort((a, b) => a.order - b.order)
          .map((day) => (
            <AccordionItem
              key={day.id}
              value={day.id}
              className="bg-white/5 border border-white/8 rounded-2xl px-5 overflow-hidden"
            >
              <AccordionTrigger className="py-4 hover:no-underline data-[spate=open]:text-violet-400 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="bg-white/8 p-1.5 rounded-lg">
                    <Dumbbell size={14} className="text-white/50" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm leading-tight">
                      {day.name}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {day.workoutSets.length} exercícios
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3 pt-1">
                  {/* Lista de exercícios */}
                  {day.workoutSets
                    .sort((a, b) => a.order - b.order)
                    .map((set, index) => (
                      <div
                        key={set.id}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
                      >
                        {/* Número do exercício */}
                        <span className="text-white/20 text-xs font-bold w-5 text-center shrink-0">
                          {index + 1}
                        </span>

                        {/* Info do exercício */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {set.exercise.name}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">
                            {set.exercise.muscleGroup}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-center">
                            <p className="text-white text-sm font-bold">
                              {set.weight}kg
                            </p>
                            <p className="text-white/30 text-[10px]">carga</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white text-sm font-bold">
                              {set.restTime}
                            </p>
                            <p className="text-white/30 text-[10px]">
                              descanso
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white text-sm font-bold">
                              {set.repetitions}
                            </p>
                            <p className="text-white/30 text-[10px]">reps</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {/* Botão iniciar treino */}
                  <button
                    onClick={() => navigate(`/training/${day.id}`)}
                    className="w-full mt-1 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play size={14} />
                    Iniciar {day.name.split("—")[0].trim()}
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};
