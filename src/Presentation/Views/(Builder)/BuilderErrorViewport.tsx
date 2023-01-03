import * as React from "react";
import { Alert } from "reactstrap";
import { MIN_WIDTH_BUILDER } from "@Core/env";
import { getBreakpointFromSize } from "@Core/Helpers/utils";

function BuilderErrorViewport() {
  const hiderClassName = `d-${getBreakpointFromSize(MIN_WIDTH_BUILDER)}-none`;

  return (
    <Alert
      role="alert"
      color="danger"
      className={`position-fixed mb-0 min-vw-100 min-vh-100 top-0 d-flex flex-column align-items-center justify-content-center z-20 ${hiderClassName}`}
    >
      <span className="display-1 mb-3">🍱</span>
      <p className="mb-0 text-center text-dark">
        Unavailable. Please use a larger screen with a minimum of{" "}
        {MIN_WIDTH_BUILDER} pixels in width.
      </p>
    </Alert>
  );
}

export default BuilderErrorViewport;
