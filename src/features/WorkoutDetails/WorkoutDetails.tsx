import React, { useEffect } from "react";
import { Typography, Space, Button, Spin } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { fetchWorkoutDetails } from "./WorkoutDetailsSlice";
import { RootState } from "../../store";

import "./WorkoutDetails.scss";

export const WorkoutDetails = ({
  match,
}: RouteComponentProps<{ workoutId: string }>) => {
  const { workout, loading } = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch();
  const { workoutId } = match.params;
  useEffect(() => {
    dispatch(fetchWorkoutDetails(workoutId));
  }, [workoutId]);

  if (!workout) {
    return null;
  }

  if (loading) {
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  }

  return (
    <div>
      <section className="workout-image-container">
        <img
          className="workout-image"
          src="https://mikematt.files.wordpress.com/2011/08/1162658-1024x768-hope-solo.jpg?w=848"
        />
      </section>
      <section className="details-container">
        <Typography.Title>{workout.name}</Typography.Title>
        <Space direction="vertical" />
        <Typography.Paragraph strong>
          Date: {moment(workout.startDate).format("YYYY-MM-DD")}
          <p className="category">Category: {workout?.category}</p>
        </Typography.Paragraph>
        <Space direction="horizontal" />
        <Typography.Text>{workout.description}</Typography.Text>
        <Link className="button-link return-button" to="/">
          <Button>Return to the main page</Button>
        </Link>
      </section>
    </div>
  );
};
