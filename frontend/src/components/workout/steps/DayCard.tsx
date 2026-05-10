// src/components/workout/steps/DayCard.tsx
import { useState } from "react";
import {
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Trash2, Plus, ChevronDown, Pencil, Check } from "lucide-react";
import { type WorkoutPlanFormData } from "@/schemas/workoutForm.schema";
import { ExercisePickerSheet } from "../ExercisePickerSheet";

interface ExerciseDisplay {
  name: string;
  muscleGroup: string;
}

interface DayCardProps {
  dayIndex: number;
  control: Control<WorkoutPlanFormData>;
  register: UseFormRegister<WorkoutPlanFormData>;
  isOpen: boolean;
  onToggle: () => void;
  onRemoveDay: () => void;
}

export function DayCard({
  dayIndex,
  control,
  register,
  isOpen,
  onToggle,
  onRemoveDay,
}: DayCardProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [exerciseDisplayMap, setExerciseDisplayMap] = useState<
    Record<string, ExerciseDisplay>
  >({});
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const {
    fields: exerciseFields,
    remove: removeExercise,
    append: appendExercise,
  } = useFieldArray({
    control,
    name: `trainingDays.${dayIndex}.workoutSets`,
  });

  const watchedSets = useWatch({
    control,
    name: `trainingDays.${dayIndex}.workoutSets`,
  });

  function handleSelectExercise(exercise: {
    id: string;
    name: string;
    muscleGroup: string;
  }) {
    appendExercise({
      exerciseId: exercise.id,
      sets: 3,
      repetitions: "12",
      weight: 0,
      restTime: 60,
      order: exerciseFields.length + 1,
    });
    setExerciseDisplayMap((prev) => ({
      ...prev,
      [exercise.id]: { name: exercise.name, muscleGroup: exercise.muscleGroup },
    }));
  }

  function toggleExercise(fieldId: string) {
    setExpandedExercise((prev) => (prev === fieldId ? null : fieldId));
  }

  return (
    <>
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        {/* Header do dia */}
        <div className="flex items-center gap-3 p-4">
          <button
            type="button"
            onClick={onToggle}
            className="flex-1 flex items-center gap-3 text-left"
          >
            <div className="flex-1">
              <input
                {...register(`trainingDays.${dayIndex}.name`)}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent text-white font-semibold text-sm outline-none w-full"
              />
              <p className="text-white/40 text-xs mt-0.5">
                {exerciseFields.length} exercícios
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`text-white/30 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={onRemoveDay}
            className="p-2 text-red-400/60 hover:text-red-400 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Conteúdo expandido */}
        {isOpen && (
          <div className="border-t border-white/5 px-4 pb-4 pt-3 flex flex-col gap-2">
            {exerciseFields.map((field, exIndex) => {
              const display = exerciseDisplayMap[field.exerciseId];
              const isExpanded = expandedExercise === field.id;

              return (
                <div
                  key={field.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? "bg-violet-500/10 border-violet-500/20"
                      : "bg-white/5 border-white/8"
                  }`}
                >
                  {/* Linha colapsada — sempre visível */}
                  <div className="flex items-center gap-2 p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {display?.name ?? "Exercício"}
                      </p>
                      {!isExpanded && (
                        <p className="text-white/40 text-xs mt-0.5">
                          {watchedSets?.[exIndex]?.sets}
                          {""} x {""}
                          {watchedSets?.[exIndex]?.repetitions} reps · {""}
                          {watchedSets?.[exIndex]?.weight}kg · {""}
                          {watchedSets?.[exIndex]?.restTime}s descanso
                        </p>
                      )}
                      {isExpanded && (
                        <p className="text-violet-400/60 text-xs mt-0.5">
                          {display?.muscleGroup}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => removeExercise(exIndex)}
                        className="p-1.5 text-red-400/50 hover:text-red-400 transition-colors duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleExercise(field.id)}
                        className={`p-1.5 transition-colors duration-200 ${
                          isExpanded
                            ? "text-violet-400"
                            : "text-white/30 hover:text-white/60"
                        }`}
                      >
                        {isExpanded ? (
                          <Check size={14} />
                        ) : (
                          <Pencil size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Inputs — só quando expandido */}
                  {isExpanded && (
                    <div className="px-3 pb-3 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-white/40 text-[10px] uppercase tracking-widest mb-1 block">
                          Séries
                        </label>
                        <input
                          {...register(
                            `trainingDays.${dayIndex}.workoutSets.${exIndex}.sets`,
                            { valueAsNumber: true },
                          )}
                          type="number"
                          className="w-full bg-white/8 rounded-lg py-2 px-3 text-white text-sm outline-none focus:ring-1 focus:ring-violet-500/50 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-[10px] uppercase tracking-widest mb-1 block">
                          Repetições
                        </label>
                        <input
                          {...register(
                            `trainingDays.${dayIndex}.workoutSets.${exIndex}.repetitions`,
                          )}
                          type="text"
                          placeholder="ex: 12 ou 6-8"
                          className="w-full bg-white/8 rounded-lg py-2 px-3 text-white text-sm outline-none focus:ring-1 focus:ring-violet-500/50 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-[10px] uppercase tracking-widest mb-1 block">
                          Carga (kg)
                        </label>
                        <input
                          {...register(
                            `trainingDays.${dayIndex}.workoutSets.${exIndex}.weight`,
                            { valueAsNumber: true },
                          )}
                          type="number"
                          className="w-full bg-white/8 rounded-lg py-2 px-3 text-white text-sm outline-none focus:ring-1 focus:ring-violet-500/50 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-[10px] uppercase tracking-widest mb-1 block">
                          Descanso (s)
                        </label>
                        <input
                          {...register(
                            `trainingDays.${dayIndex}.workoutSets.${exIndex}.restTime`,
                            { valueAsNumber: true },
                          )}
                          type="number"
                          className="w-full bg-white/8 rounded-lg py-2 px-3 text-white text-sm outline-none focus:ring-1 focus:ring-violet-500/50 transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Botão adicionar exercício */}
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="w-full border border-dashed border-white/15 rounded-xl py-3 text-white/40 text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 mt-1"
            >
              <Plus size={14} />
              Adicionar Exercício
            </button>
          </div>
        )}
      </div>

      <ExercisePickerSheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelectExercise}
      />
    </>
  );
}
