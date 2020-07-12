import { Layout, DatePicker, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setPage,
  fetchWorkouts,
  setDate,
} from "./WorkoutsSlice";
import { RootState } from "store";
import { WorkoutsList } from "../../components/WorkoutsList/WorkoutsList";
import { CategoriesSelector } from "../../components/CategoriesSelector/CategoriesSelector";

function disabledDate(current: Moment) {
  // Can not select days before today and today
  return (
    current &&
    (current < moment().subtract(1, "month").endOf("day") ||
      current > moment().add(11, "month").endOf("day"))
  );
}
export const Workouts = () => {
  const [categoriesChanged, setCategoriesChanged] = useState(false);
  const {
    workouts,
    currentPage,
    currentDate,
    currentCategories,
    total,
  } = useSelector((state: RootState) => state.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [currentPage, currentDate, categoriesChanged]);

  return (
    <Layout>
      <Layout.Content>
        <DatePicker
          picker="month"
          defaultValue={currentDate ? moment(currentDate) : moment()}
          onChange={(date: any) => dispatch(setDate(moment.utc(date).format()))}
          disabledDate={disabledDate}
        />
        <CategoriesSelector
          selected={currentCategories}
          onSelect={(categories) => {
            dispatch(setCategories(categories));
            setCategoriesChanged((prevStatus) => !prevStatus);
          }}
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
