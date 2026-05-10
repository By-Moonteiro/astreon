// src/components/workout/steps/StepConfirm.tsx
import { type UseFormGetValues } from "react-hook-form";
import { type WorkoutPlanFormData } from "@/schemas/workoutForm.schema";

interface StepConfirmProps {
  getValues: UseFormGetValues<WorkoutPlanFormData>;
}

export function StepConfirm({ getValues }: StepConfirmProps) {
  const name = getValues("name");
  const endDate = getValues("endDate");
  const trainingDays = getValues("trainingDays");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/40 text-sm">Revise sua ficha antes de criar.</p>

      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
          Nome
        </p>
        <p className="text-white font-semibold">{name}</p>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
          Válida até
        </p>
        <p className="text-white font-semibold">
          {new Date(endDate).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
          Dias de Treino
        </p>
        <div className="flex flex-col gap-2">
          {trainingDays.map((day, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <p className="text-white text-sm font-medium">{day.name}</p>
              <p className="text-white/40 text-xs">
                {day.workoutSets.length} exercícios
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
