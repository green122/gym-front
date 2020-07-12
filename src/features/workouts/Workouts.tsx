import { Layout, DatePicker, Pagination } from "antd";
import React, { useEffect } from "react";
import moment, { Moment } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setPage, fetchWorkouts } from "./WorkoutsSlice";
import { RootState } from "store";
import { WorkoutsList } from "../../components/WorkoutsList/WorkoutsList";

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
  const total = useSelector((state: RootState) => state.workouts.total);
  const loading = useSelector((state: RootState) => state.workouts.loading);
  const error = useSelector((state: RootState) => state.workouts.error);
  const currentPage = useSelector(
    (state: RootState) => state.workouts.currentPage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [currentPage]);

  return (
    <Layout>
      <Layout.Content>
        <DatePicker
          picker="month"
          onChange={console.log}
          disabledDate={disabledDate}
        />
        {workouts && <WorkoutsList workouts={workouts} />}
        <Pagination
          current={currentPage}
          onChange={(page: number) => dispatch(setPage(page))}
          total={total}
        />
      </Layout.Content>
    </Layout>
  );
};
