// src/components/workout/CreateWorkoutSheet.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  WorkoutPlanFormSchema,
  type WorkoutPlanFormData,
} from "@/schemas/workoutForm.schema";
import { StepInfo } from "./steps/StepInfo";
import { StepDays } from "./steps/StepDays";

interface CreateWorkoutSheetProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: WorkoutPlanFormData) => void;
}

const STEPS = ["Informações", "Treinos"];

export function CreateWorkoutSheet({
  open,
  onClose,
  onSave,
}: CreateWorkoutSheetProps) {
  const [step, setStep] = useState(0);
  const [showDayError, setShowDayError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<WorkoutPlanFormData>({
    resolver: zodResolver(WorkoutPlanFormSchema),
    defaultValues: {
      name: "",
      endDate: "",
      trainingDays: [],
    },
  });

  async function handleNext() {
    if (step === 0) {
      const valid = await trigger(["name", "endDate"]);
      if (!valid) return;
    }
    if (step === 1) {
      const days = getValues("trainingDays");
      if (days.length === 0) {
        setShowDayError(true);
        return;
      }
      setShowDayError(false);
    }
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setStep((prev) => prev - 1);
  }

  function handleClose() {
    onClose();
    setStep(0);
    reset();
  }

  function onSubmit(data: WorkoutPlanFormData) {
    console.log(" submit", data);
    onSave(data);
    handleClose();
  }

  return (
    <Sheet open={open} onOpenChange={handleClose} modal={false}>
      <SheetContent
        side="bottom"
        className="bg-[#0d0d0f] border-t border-white/8 rounded-t-3xl px-4 pt-4 pb-8 max-h-[92vh] overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-lg font-bold">
              Nova Ficha
            </SheetTitle>
            <button type="button" onClick={handleClose}>
              <X size={18} className="text-white/40" />
            </button>
          </div>

          {/* Steps indicator */}
          <div className="flex gap-2 mt-4">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <div
                  className={`h-1 w-full rounded-full transition-all duration-300 ${
                    i <= step ? "bg-violet-500" : "bg-white/10"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    i === step ? "text-violet-400" : "text-white/30"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Steps */}
          {step === 0 && <StepInfo register={register} errors={errors} />}
          {step === 1 && (
            <StepDays
              control={control}
              register={register}
              showEmptyError={showDayError}
            />
          )}

          {/* Navegação */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-white/10 text-white/60 font-semibold text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Voltar
              </button>
            )}

            {step < 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Continuar
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200"
              >
                Criar Ficha
              </button>
            )}
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
