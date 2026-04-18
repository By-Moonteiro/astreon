import { IsOptional, IsString } from 'class-validator';

export class GetExercisesFilterDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  muscleGroup?: string;
}
