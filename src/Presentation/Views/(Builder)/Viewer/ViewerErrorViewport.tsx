import * as React from "react";
import { Alert } from "reactstrap";

function ViewerErrorViewport() {
  return (
    <Alert
      role="alert"
      color="danger"
      className="position-fixed mb-0 top-0 end-0 bottom-0 start-0 d-flex flex-column align-items-center justify-content-center d-sm-none z-20"
    >
      <span className="display-1 mb-3">🍱</span>
      <p className="mb-0 text-center text-dark">
        Unavailable. Please use a larger screen with a minimum of 557 pixels in
        width.
      </p>
    </Alert>
  );
}

export default ViewerErrorViewport;
