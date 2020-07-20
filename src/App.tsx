import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Workouts } from "./features/workouts/Workouts";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WorkoutDetails } from "./features/WorkoutDetails/WorkoutDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact={true} component={Workouts} />
          <Route path="/workout/:workoutId" component={WorkoutDetails} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
