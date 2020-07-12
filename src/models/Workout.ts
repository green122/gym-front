export interface Workout {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  category: string;
}

export interface WorkoutResponse {
  workouts: Workout[],
  total: number
}

export type Category = "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7";
