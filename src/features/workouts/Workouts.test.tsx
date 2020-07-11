// import { screen, fireEvent, waitFor } from "@testing-library/react";
// import Counter from "./Workouts";
// import React from "react";
// import counterReducer, { increment, decrement } from "./WorkoutsSlice";
// import { renderWithRedux, rootInitialState } from "utils/test-helpers";
// import axios from "axios";
// import { fetchWorkouts } from "./WorkoutsSlice";
//
// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;
//
// describe("<Counter />", () => {
//   test("shows zero as initial value", () => {
//     renderWithRedux(<Counter />);
//     expect(screen.getByText("0")).toBeVisible();
//   });
//
//   test("shows loading message", () => {
//     renderWithRedux(<Counter />, {
//       ...rootInitialState,
//       counter: { ...rootInitialState.counter, loading: true },
//     });
//     expect(screen.getByText(/loading/i)).toBeVisible();
//   });
//
//   test("shows error message", () => {
//     const errorMessage = "An error occured";
//     renderWithRedux(<Counter />, {
//       ...rootInitialState,
//       counter: { ...rootInitialState.counter, error: errorMessage },
//     });
//     expect(screen.getByText(errorMessage)).toBeVisible();
//   });
//
//   test("calls increment on click", () => {
//     const { mockStore } = renderWithRedux(<Counter />);
//     fireEvent.click(screen.getByText(/increment/i));
//     expect(mockStore.getActions()).toEqual([{ type: increment.type }]);
//   });
//
//   test("calls decrement on click", () => {
//     const { mockStore } = renderWithRedux(<Counter />);
//     fireEvent.click(screen.getByText(/decrement/i));
//     expect(mockStore.getActions()).toEqual([{ type: decrement.type }]);
//   });
//
//   test("slow fetch success", async () => {
//     const name = "cra-template-typekit";
//     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { name } });
//     jest.useFakeTimers();
//
//     const { mockStore } = renderWithRedux(<Counter />);
//
//     fireEvent.click(screen.getByText(/slow fetch/i));
//
//     jest.runAllTimers();
//     // Normally we would wait for an element to show up
//     // https://github.com/testing-library/react-testing-library#complex-example
//     await waitFor(() => null, { timeout: 500 });
//
//     expect(mockStore.getActions()[0].type).toEqual(fetchWorkouts.pending.type);
//     expect(mockStore.getActions()[1].type).toEqual(fetchWorkouts.fulfilled.type);
//     expect(mockStore.getActions()[1].payload).toEqual(name.length);
//   });
//
//   test("slow fetch error", async () => {
//     mockedAxios.get.mockResolvedValueOnce({ status: 500 });
//     jest.useFakeTimers();
//
//     const { mockStore } = renderWithRedux(<Counter />);
//
//     fireEvent.click(screen.getByText(/slow fetch/i));
//
//     jest.runAllTimers();
//     // Normally we would wait for an element to show up
//     // https://github.com/testing-library/react-testing-library#complex-example
//     await waitFor(() => null, { timeout: 500 });
//
//     expect(mockStore.getActions()[0].type).toEqual(fetchWorkouts.pending.type);
//     expect(mockStore.getActions()[1].type).toEqual(fetchWorkouts.rejected.type);
//     expect(mockStore.getActions()[1].payload).toEqual("Something went wrong.");
//   });
// });
//
// describe("CounterSlice", () => {
//   test("sets loading on fetch start", () => {
//     expect(
//       counterReducer(
//         { ...rootInitialState.counter, loading: false },
//         fetchWorkouts.pending
//       )
//     ).toEqual({ ...rootInitialState.counter, loading: true });
//   });
//
//   test("sets value and stop loading on fetch success", () => {
//     expect(
//       counterReducer(
//         { ...rootInitialState.counter, loading: true },
//         { type: fetchWorkouts.fulfilled.type, payload: 100 }
//       )
//     ).toEqual({ ...rootInitialState.counter, loading: false, value: 100 });
//   });
//
//   test("sets error and stop loading on fetch error", () => {
//     expect(
//       counterReducer(
//         { ...rootInitialState.counter, loading: true },
//         { type: fetchWorkouts.rejected, payload: "Some error message." }
//       )
//     ).toEqual({
//       ...rootInitialState.counter,
//       loading: false,
//       error: "Some error message.",
//     });
//   });
//
//   test("increases number by one", () => {
//     expect(
//       counterReducer({ ...rootInitialState.counter, value: 1 }, increment)
//     ).toEqual({ ...rootInitialState.counter, value: 2 });
//   });
//
//   test("decreases number by one", () => {
//     expect(
//       counterReducer({ ...rootInitialState.counter, value: 1 }, decrement)
//     ).toEqual({ ...rootInitialState.counter, value: 0 });
//   });
// });
