import { useState } from "react";
import {
  type Control,
  type UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { Plus } from "lucide-react";
import { type WorkoutPlanFormData } from "@/schemas/workoutForm.schema";
import { DayCard } from "./DayCard";

interface StepDaysProps {
  control: Control<WorkoutPlanFormData>;
  register: UseFormRegister<WorkoutPlanFormData>;
  showEmptyError: boolean;
}

export function StepDays({ control, register, showEmptyError }: StepDaysProps) {
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({});

  const {
    fields: dayFields,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({ control, name: "trainingDays" });

  function toggleDay(index: number) {
    setOpenDays((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function handleAddDay() {
    const order = dayFields.length + 1;
    appendDay({
      name: `Treino ${String.fromCharCode(64 + order)}`,
      order,
      workoutSets: [],
    });
    setOpenDays((prev) => ({ ...prev, [dayFields.length]: true }));
  }

  return (
    <div className="flex flex-col gap-3">
      {dayFields.map((day, dayIndex) => (
        <DayCard
          key={day.id}
          dayIndex={dayIndex}
          control={control}
          register={register}
          isOpen={!!openDays[dayIndex]}
          onToggle={() => toggleDay(dayIndex)}
          onRemoveDay={() => removeDay(dayIndex)}
        />
      ))}

      {showEmptyError && dayFields.length === 0 && (
        <p className="text-red-400 text-xs text-center py-2">
          Adicione pelo menos 1 dia de treino
        </p>
      )}

      <button
        type="button"
        onClick={handleAddDay}
        className="w-full border border-dashed border-white/20 rounded-2xl py-4 text-white/40 text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200"
      >
        <Plus size={16} />
        Adicionar Dia de Treino
      </button>
    </div>
  );
}
