import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Error404 from "./containers/Error404/Error404";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Booking from "./containers/Booking/Booking";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/bookings">
        <Booking />
      </Route>
      <Route>
        <Error404 />
      </Route>
    </Switch>
  );
}
