import React from "react";
import ShowData from "./ShowData";
import Home from "./containers/Home";
import AddPage from "./containers/AddPage";
import Dashboard from "./containers/Dashboard";
import ShowAddPage from "./containers/ShowAddPage";
import EditContent from "./containers/EditContent";
import ProtectedRoute from "./components/ProtectedRoute";
import CoursesAvailble from "./containers/CoursesAvailble";
import LearnerShowPages from "./containers/LearnerShowPages";
import OldDashboard from "./containers/OldDashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Error404 } from "./components/error";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          exact
          path="/addpage"
          component={AddPage}
          role={"tutor"}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/showaddpage"
          component={ShowAddPage}
          role={"tutor"}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/showdata/:id"
          component={ShowData}
          role={"tutor"}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/editContent/:id"
          component={EditContent}
          role={"tutor"}
        ></ProtectedRoute>

        {/* Learner ProtectedRoutes */}
        <ProtectedRoute
          exact
          path="/coursesavailble"
          component={CoursesAvailble}
          role={"learner"}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/learnershowpages/:id"
          component={LearnerShowPages}
          role={"learner"}
        ></ProtectedRoute>
        <Route
          exact
          path="/old/:id/:title"
          component={OldDashboard}
          role={"tutor"}
        />
        {/* New Dashboard. */}
        <Route exact role="tutor" component={Dashboard} path="/:id" />
        <Route
          exact
          role="tutor"
          component={Dashboard}
          path="/:id/page/:page"
        />
        {/* Errors */}
        <Route path="/error/404" component={Error404} />
        {/* Home */}
        <Route path="/" component={Home} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}
