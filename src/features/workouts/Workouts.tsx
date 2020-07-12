import React, { useEffect } from "react";
import moment, { Moment } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setPage, fetchWorkouts } from "./WorkoutsSlice";
import { RootState } from "store";
import { Layout, DatePicker } from "antd";

function disabledDate(current: Moment) {
  // Can not select days before today and today
  return (
    current &&
    (current < moment().subtract(1, "month").endOf("day") ||
      current > moment().add(11, "month").endOf("day"))
  );
}
export const Workouts: React.FC = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const loading = useSelector((state: RootState) => state.workouts.loading);
  const error = useSelector((state: RootState) => state.workouts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  return (
    <Layout>
      <Layout.Content>
        <DatePicker
          picker="month"
          onChange={console.log}
          disabledDate={disabledDate}
        />
      </Layout.Content>
    </Layout>
  );
};
