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

export type Category = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7";
