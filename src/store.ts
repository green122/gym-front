import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { workoutReducer } from "./features/workouts/WorkoutsSlice";
import { workoutDetailsReducer } from "./features/WorkoutDetails/WorkoutDetailsSlice";

export const rootReducer = combineReducers({
  workouts: workoutReducer,
  details: workoutDetailsReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
