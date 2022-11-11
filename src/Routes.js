// import ShowData from "./ShowData";
// import AddPage from "./containers/AddPage";
// import ShowAddPage from "./containers/ShowAddPage";
// import EditContent from "./containers/EditContent";
import React from "react";
import Home from "./containers/Home";
import Dashboard from "./containers/Dashboard";
import CoursesAvailble from "./containers/CoursesAvailble";
import LearnerShowPages from "./containers/LearnerShowPages";
import OldDashboard from "./containers/OldDashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Error404 } from "./components/error";

// Content Builder.
import { Viewer } from "./Presentation/Views/(Builder)";

// Helpers.
import { ProtectedRoute } from "./Core/Helpers/ProtectedRoute";

export default function Routes() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Switch>
        {/* <ProtectedRoute
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
        />*/}
        {/* Builder > Viewer. */}
        <Route path="/viewer/:id/:slug">
          <ProtectedRoute userType={user.user_type} expectedUserType="learner">
            <Viewer />
          </ProtectedRoute>
        </Route>
        <Route path="/viewer/:id/:slug/page/:page">
          <ProtectedRoute userType={user.user_type} expectedUserType="learner">
            <Viewer />
          </ProtectedRoute>
        </Route>
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
