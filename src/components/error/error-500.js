import * as React from "react";
import ErrorFooter from "./error-footer";

/**
 * A page to display internal server error.
 * @returns {JSX.Element}
 *
 * @version 0.0.1
 * @author kashan-ahmad
 *
 * @changelog
 * - 0.0.1: Initial version.
 */
const Error500 = () => (
  <div className="min-vh-100 w-100 position-absolute top-0 end-0 bottom-0 start-0 d-flex align-items-center justify-content-center bg-light z-100">
    <div className="text-center">
      <div className="display-1">500</div>
      <p>Internal server error, please try again.</p>
      <div>
        <ErrorFooter />
      </div>
    </div>
  </div>
);

export default Error500;
