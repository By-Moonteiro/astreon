import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  muscleGroup: z.string(),
  description: z.string().optional(),
  executionMediaUrl: z.string(),
});

export const WorkoutSetSchema = z.object({
  id: z.string(),
  exercise: ExerciseSchema,
  sets: z.number(),
  repetitions: z.number(),
  weight: z.number(),
  restTime: z.number(),
  order: z.number(),
});

export const TrainingDaySchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number(),
  workoutSets: z.array(WorkoutSetSchema),
});

export const WorkoutPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  endDate: z.string(),
  status: z.enum(["active", "expired", "archived"]),
  trainingDays: z.array(TrainingDaySchema),
  createdAt: z.string(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;
export type WorkoutSet = z.infer<typeof WorkoutSetSchema>;
export type TrainingDay = z.infer<typeof TrainingDaySchema>;
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;
