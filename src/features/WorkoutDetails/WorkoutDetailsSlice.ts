import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Workout } from "../../models/Workout";

interface InitialState {
  workout: Workout | null;
  loading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  workout: null,
  loading: false,
  error: null,
};

export const fetchWorkoutDetails = createAsyncThunk(
  "workouts/fetchDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Workout>(
        `http://localhost:4400/workouts/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Something went wrong.");
    }
  }
);

export const slice = createSlice({
  name: "workoutDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWorkoutDetails.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchWorkoutDetails.fulfilled.type]: (
      state,
      action: PayloadAction<Workout>
    ) => {
      state.workout = action.payload;
      state.loading = false;
    },
    [fetchWorkoutDetails.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const workoutDetailsReducer = slice.reducer;
