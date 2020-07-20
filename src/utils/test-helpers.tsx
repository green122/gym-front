import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RootState } from "store";
import { initialState as workoutsInitialState } from "../features/workouts/WorkoutsSlice";
import { initialState as workoutDetailsState } from "../features/WorkoutDetails/WorkoutDetailsSlice";

export const rootInitialState = {
  workouts: workoutsInitialState,
  details: workoutDetailsState,
};
const mockStore = configureStore<typeof rootInitialState>([thunk]);

export const renderWithRedux = (
  ui: JSX.Element,
  initialState: RootState = rootInitialState
) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    mockStore: store,
  };
};
