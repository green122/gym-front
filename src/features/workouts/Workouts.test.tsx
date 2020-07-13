import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Workouts } from "./Workouts";
import React from "react";
import { renderWithRedux, rootInitialState } from "utils/test-helpers";
import axios from "axios";
import { fetchWorkouts } from "./WorkoutsSlice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockResponse = [
  {
    id: 1,
    name: "Florinda Raunds",
    description:
      "convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat",
    startDate: "2020-10-17T15:22:55Z",
    category: "c6",
  },
  {
    id: 2,
    name: "Peggie Carradice",
    description:
      "in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien",
    startDate: "2021-03-15T05:23:57Z",
    category: "c1",
  },
  {
    id: 3,
    name: "Milzie Iannello",
    description:
      "nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue",
    startDate: "2021-03-27T04:35:49Z",
    category: "c7",
  },
];

describe("Workouts Component", () => {
  it("show fetch workouts action and get successful result in the action", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: { total: 10, workouts: mockResponse },
    });
    jest.useFakeTimers();
    const { mockStore } = renderWithRedux(<Workouts />);
    jest.runAllTimers();
    await waitFor(() => null);
    expect(mockStore.getActions()[0].type).toEqual(fetchWorkouts.pending.type);
    expect(mockStore.getActions()[1].type).toEqual(
      fetchWorkouts.fulfilled.type
    );
    expect(mockStore.getActions()[1].payload).toEqual({
      total: 10,
      workouts: mockResponse,
    });
    expect(mockStore.getState().workouts.workouts).toEqual(mockResponse);
  });
});
