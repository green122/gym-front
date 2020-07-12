import React, { useEffect, useState } from "react";
import { Typography, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchWorkoutDetails } from "./WorkoutDetailsSlice";
import { RootState } from "../../store";

export const WorkoutDetails = ({
  match,
}: RouteComponentProps<{ workoutId: string }>) => {
  const { workout, loading, error } = useSelector(
    (state: RootState) => state.details
  );
  const dispatch = useDispatch();
  const { workoutId } = match.params;
  useEffect(() => {
    dispatch(fetchWorkoutDetails(workoutId));
  }, [workoutId]);

  if (!workout) {
    return null;
  }

  return (
    <div>
      <Typography.Title>{workout.name}</Typography.Title>
      <Space direction="vertical" />
      <Typography.Text>{workout.description}</Typography.Text>
    </div>
  );
};
