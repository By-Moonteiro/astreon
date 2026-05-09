import { z } from "zod";

export const WorkoutSetFormSchema = z.object({
  exerciseId: z.string().min(1, "Selecione um exercício"),
  sets: z.number().min(1, "Mínimo 1 série"),
  repetitions: z.number().min(1, "Mínimo 1 repetição"),
  weight: z.number().min(0, "Peso não pode ser negativo"),
  restTime: z.number().min(0, "Descanso não pode ser negativo"),
  order: z.number(),
});

export const TrainingDayFormSchema = z.object({
  name: z.string().min(1, "Nome do dia é obrigatório"),
  order: z.number(),
  workoutSets: z.array(WorkoutSetFormSchema),
});

export const WorkoutPlanFormSchema = z.object({
  name: z.string().min(1, "Nome da ficha é obrigatório"),
  endDate: z.string().min(1, "Data de validade é obrigatória"),
  trainingDays: z
    .array(TrainingDayFormSchema)
    .min(1, "Adicione pelo menos 1 dia de treino"),
});

export type WorkoutPlanFormData = z.infer<typeof WorkoutPlanFormSchema>;
