import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Workout, WorkoutResponse } from "../../models/Workout";
import { RootState } from "../../store";
import { removeEmptyProperties } from "../../utils/removeEmptyProperties";

interface InitialState {
  workouts: Workout[] | null;
  currentPage: number;
  currentCategories: Category[];
  itemsOnPage: number;
  total: number;
  currentDate: string;
  loading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  workouts: null,
  currentPage: 1,
  currentDate: "",
  currentCategories: [],
  itemsOnPage: 10,
  total: 0,
  loading: false,
  error: null,
};

export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchList",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        workouts: { currentCategories, currentPage, itemsOnPage, currentDate },
      } = getState() as RootState;
      const params: any = removeEmptyProperties({
        from: (currentPage - 1) * itemsOnPage,
        to: currentPage * itemsOnPage,
        date: currentDate,
        categories: currentCategories ? currentCategories.join(",") : undefined,
      });
      const response = await axios.get<WorkoutResponse>(
        "http://localhost:4400/workouts",
        {
          params,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Something went wrong.");
    }
  }
);

export const slice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategories: (state, action) => {
      state.currentCategories = action.payload;
    },
    setDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
  extraReducers: {
    [fetchWorkouts.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchWorkouts.fulfilled.type]: (
      state,
      action: PayloadAction<WorkoutResponse>
    ) => {
      state.workouts = action.payload.workouts;
      state.total = action.payload.total;
      state.loading = false;
      state.currentPage = 1;
    },
    [fetchWorkouts.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCategories, setPage, setDate } = slice.actions;

export const workoutReducer = slice.reducer;
