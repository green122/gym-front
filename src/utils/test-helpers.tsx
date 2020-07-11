import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState as counterInitialState } from "features/counter/CounterSlice";
import { RootState } from "store";
import { initialState as workoutsInitialState } from "../features/workouts/WorkoutsSlice";

const mockStore = configureStore([thunk]);

export const rootInitialState = {
  counter: counterInitialState,
  workouts: workoutsInitialState,
};

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
