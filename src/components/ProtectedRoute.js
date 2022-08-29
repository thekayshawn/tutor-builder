import React from "react";
import { Error403 } from "./error";
import { Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    var isAuthenticated = user.isAuthenticated;
    var userType = user.user_type;
  }

  return (
    <>
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated && userType === restOfProps.role ? (
            <Component {...props} />
          ) : (
            <Error403 />
          )
        }
      />
    </>
  );
}

export default ProtectedRoute;
