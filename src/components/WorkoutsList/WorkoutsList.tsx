import React from "react";
import { Workout } from "../../models/Workout";
import { Card } from "antd";
import "./WorkoutsList.scss";

interface WorkoutsListProps {
  workouts: Workout[];
}

export const WorkoutsList = ({ workouts }: WorkoutsListProps) => {
  return (
    <div className="workouts-list">
      {workouts.map((workout) => (
        <Card
          key={workout.id}
          className="workout-card"
          hoverable
          cover={
            <img
              alt="example"
              src="https://i.pinimg.com/originals/d7/a3/1a/d7a31a79cbba371a88926b6da1107913.png"
            />
          }
        >
          <Card.Meta
            title={workout.name}
            description={`${workout.description.slice(0, 70)}...`}
          />
        </Card>
      ))}
    </div>
  );
};
