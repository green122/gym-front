import { DatePicker, Pagination } from "antd";
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
import "./Workouts.scss";

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
    itemsOnPage,
    total,
  } = useSelector((state: RootState) => state.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [currentPage, currentDate, categoriesChanged]);
  return (
    <div className="layout-container">
      <div className="filters">
        <div className="filter-group">
          <p className="filter-label">Select Date:</p>
          <DatePicker
            picker="month"
            defaultValue={currentDate ? moment(currentDate) : undefined}
            onChange={(date: any) =>
              dispatch(setDate(moment.utc(date).format()))
            }
            disabledDate={disabledDate}
          />
        </div>
        <div className="filter-group">
          <p className="filter-label">Select Category:</p>
          <CategoriesSelector
            selected={currentCategories}
            onSelect={(categories) => {
              dispatch(setCategories(categories));
              setCategoriesChanged((prevStatus) => !prevStatus);
            }}
          />
        </div>
      </div>
      {workouts && <WorkoutsList workouts={workouts} />}
      <div className="paginator">
        <Pagination
          current={currentPage}
          pageSize={itemsOnPage}
          showSizeChanger={false}
          onChange={(page: number) => dispatch(setPage(page))}
          total={total}
        />
      </div>
    </div>
  );
};
