import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Dumbbell, Check, ChevronDown } from "lucide-react";
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
          sets: 3,
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
          sets: 3,
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
          sets: 4,
          repetitions: 12,
          weight: 70,
          restTime: 12,
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
          sets: 3,
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
          sets: 3,
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
          sets: 4,
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
          sets: 3,
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
          sets: 3,
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

// RestBar só exibe — sem lógica de timer aqui
function RestBar({
  timeLeft,
  restTime,
}: {
  timeLeft: number;
  restTime: number;
}) {
  const isFinished = timeLeft <= 0;
  const progress = Math.max(0, timeLeft / restTime);

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-white/40 tracking-widest uppercase">
          {isFinished ? "Pronto!" : "Descansando..."}
        </p>
        <p
          className={`text-xs font-bold tabular-nums ${isFinished ? "text-emerald-400" : "text-violet-400"}`}
        >
          {timeLeft}s
        </p>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isFinished ? "bg-emerald-500" : "bg-violet-500"}`}
          style={{ width: `${(1 - progress) * 100}%` }}
        />
      </div>
    </div>
  );
}

type ExerciseStatus = "idle" | "in_progress" | "active" | "done";

interface ExerciseState {
  status: ExerciseStatus;
  seriesDone: number;
  isResting: boolean;
  timeLeft: number;
}

export const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const plan = mockPlan;
  const status = statusConfig[plan.status as keyof typeof statusConfig];

  const day = plan.trainingDays[0];
  const sets = day.workoutSets.sort((a, b) => a.order - b.order);

  const [exerciseStates, setExerciseStates] = useState<
    Record<string, ExerciseState>
  >(() =>
    Object.fromEntries(
      sets.map((s) => [
        s.id,
        {
          status: "idle",
          seriesDone: 0,
          isResting: false,
          timeLeft: s.restTime,
        },
      ]),
    ),
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const hasResting = Object.values(exerciseStates).some(
      (state) => state.isResting && state.timeLeft > 0,
    );

    if (!hasResting) return;

    const timer = setInterval(() => {
      setExerciseStates((prev) => {
        const updated = { ...prev };
        Object.entries(updated).forEach(([id, state]) => {
          if (state.isResting && state.timeLeft > 0) {
            updated[id] = { ...state, timeLeft: state.timeLeft - 1 };
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    Object.values(exerciseStates).some((s) => s.isResting && s.timeLeft > 0),
  ]);

  function handleTap(setId: string) {
    const current = exerciseStates[setId];
    if (current.status === "done") return;

    if (activeId === setId) {
      setActiveId(null);
      setExerciseStates((prev) => ({
        ...prev,
        [setId]: {
          ...prev[setId],
          status: prev[setId].seriesDone > 0 ? "in_progress" : "idle",
        },
      }));
    } else {
      if (activeId) {
        setExerciseStates((prev) => ({
          ...prev,
          [activeId]: {
            ...prev[activeId],
            status: prev[activeId].seriesDone > 0 ? "in_progress" : "idle",
          },
        }));
      }
      setActiveId(setId);
      setExerciseStates((prev) => ({
        ...prev,
        [setId]: { ...prev[setId], status: "active" },
      }));
    }
  }

  function handleCompleteSerie(setId: string, totalSeries: number) {
    setExerciseStates((prev) => {
      const current = prev[setId];
      const newSeriesDone = current.seriesDone + 1;
      const isDone = newSeriesDone >= totalSeries;
      return {
        ...prev,
        [setId]: {
          ...prev[setId],
          status: isDone ? "done" : "active",
          seriesDone: newSeriesDone,
          isResting: !isDone,
        },
      };
    });

    const current = exerciseStates[setId];
    if (current.seriesDone + 1 >= totalSeries) {
      setActiveId(null);
    }
  }

  function handleNextSerie(setId: string) {
    const restTime = sets.find((s) => s.id === setId)!.restTime;
    setExerciseStates((prev) => ({
      ...prev,
      [setId]: { ...prev[setId], isResting: false, timeLeft: restTime },
    }));
  }

  const totalDone = Object.values(exerciseStates).filter(
    (e) => e.status === "done",
  ).length;
  const allDone = totalDone === sets.length;

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 pt-10 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
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

      {/* Nome do dia + progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-base">{day.name}</h2>
          <span className="text-white/40 text-xs">
            {totalDone}/{sets.length}
          </span>
        </div>
        <div className="flex gap-1.5">
          {sets.map((s) => {
            const st = exerciseStates[s.id];
            return (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  st.status === "done"
                    ? "bg-emerald-500"
                    : st.status === "in_progress"
                      ? "bg-violet-500/60"
                      : st.status === "active"
                        ? "bg-violet-500"
                        : "bg-white/10"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Lista de exercícios */}
      <div className="flex flex-col gap-3">
        {sets.map((set) => {
          const exState = exerciseStates[set.id];
          const isActive = activeId === set.id;
          const isDone = exState.status === "done";
          const isInProgress = exState.status === "in_progress";

          return (
            <div
              key={set.id}
              onClick={() => handleTap(set.id)}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                isDone
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : isActive
                    ? "bg-violet-500/10 border-violet-500/30"
                    : isInProgress
                      ? "bg-white/5 border-violet-500/30"
                      : "bg-white/5 border-white/8 active:scale-[0.99]"
              }`}
            >
              {/* Cabeçalho */}
              <div className="flex items-center gap-3 p-4">
                <div
                  className={`p-2 rounded-xl shrink-0 transition-all duration-200 ${
                    isDone
                      ? "bg-emerald-500/20"
                      : isActive
                        ? "bg-violet-500/20"
                        : isInProgress
                          ? "bg-violet-500/10"
                          : "bg-white/8"
                  }`}
                >
                  {isDone ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Dumbbell
                      size={16}
                      className={
                        isActive || isInProgress
                          ? "text-violet-400"
                          : "text-white/40"
                      }
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm leading-tight transition-colors duration-200 ${isDone ? "text-white/40 line-through" : "text-white"}`}
                  >
                    {set.exercise.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {set.exercise.muscleGroup}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isInProgress && (
                    <span className="text-violet-400 text-xs font-semibold">
                      {exState.seriesDone}/{set.sets}
                    </span>
                  )}
                  {!isActive && !isDone && (
                    <div className="text-right">
                      <p className="text-white/60 text-xs">
                        {set.sets}x{set.repetitions}
                      </p>
                      <p className="text-white/30 text-[10px]">
                        {set.weight}kg
                      </p>
                    </div>
                  )}
                  {!isDone && (
                    <ChevronDown
                      size={16}
                      className={`text-white/20 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </div>

              {/* Conteúdo expandido */}
              {isActive && (
                <div className="px-4 pb-4" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white font-bold text-lg">
                        {set.sets}x{set.repetitions}
                      </p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                        Séries x Reps
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white font-bold text-lg">
                        {set.weight}kg
                      </p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                        Carga
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white font-bold text-lg">
                        {set.restTime}s
                      </p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                        Descanso
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {Array.from({ length: set.sets }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          i < exState.seriesDone
                            ? "bg-emerald-500"
                            : i === exState.seriesDone
                              ? "bg-violet-500"
                              : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  {exState.isResting && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <RestBar
                        timeLeft={exState.timeLeft}
                        restTime={set.restTime}
                      />
                      {exState.timeLeft <= 0 ? (
                        <button
                          onClick={() => handleNextSerie(set.id)}
                          className="w-full mt-3 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200"
                        >
                          {`Concluir Série ${exState.seriesDone + 1} de ${set.sets}`}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNextSerie(set.id)}
                          className="w-full mt-3 border border-violet-500/30 text-violet-400 font-semibold text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
                        >
                          Pular Descanso
                        </button>
                      )}
                    </div>
                  )}

                  {!exState.isResting && (
                    <button
                      onClick={() => handleCompleteSerie(set.id, set.sets)}
                      className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200"
                    >
                      {exState.seriesDone === 0
                        ? "Iniciar Série 1"
                        : `Concluir Série ${exState.seriesDone + 1} de ${set.sets}`}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Treino concluído */}
      {allDone && (
        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-center">
          <p className="text-emerald-400 text-lg font-bold mb-1">
            🎉 Treino Concluído!
          </p>
          <p className="text-white/40 text-sm mb-4">
            Todos os exercícios foram feitos.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200"
          >
            Finalizar
          </button>
        </div>
      )}
    </div>
  );
};
