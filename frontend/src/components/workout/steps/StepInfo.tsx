import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type WorkoutPlanFormData } from "@/schemas/workoutForm.schema";

interface StepInfoProps {
  register: UseFormRegister<WorkoutPlanFormData>;
  errors: FieldErrors<WorkoutPlanFormData>;
}

export function StepInfo({ register, errors }: StepInfoProps) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div>
        <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">
          Nome da Ficha
        </label>
        <input
          {...register("name")}
          placeholder="Ex: Hipertrofia Vol.1"
          className="w-full bg-white/5 border border-white/8 rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 outline-none focus:border-violet-500/50 transition-colors duration-200"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">
          Válida até
        </label>
        <input
          {...register("endDate")}
          type="date"
          className="w-full bg-white/5 border border-white/8 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-violet-500/50 transition-colors duration-200"
        />
        {errors.endDate && (
          <p className="text-red-400 text-xs mt-1">{errors.endDate.message}</p>
        )}
      </div>
    </div>
  );
}
