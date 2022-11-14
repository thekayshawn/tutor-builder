import * as React from "react";
import { CardTitle } from "reactstrap";
import { DASHBOARD_URL } from "src/constants";

export default function ViewerFrameEmpty() {
  return (
    <article
      style={{ maxWidth: "40rem" }}
      className="h-100 w-100 mx-auto position-relative"
    >
      {/* Middle section. */}
      <div className="position-absolute top-50 start-50 translate-middle">
        <div aria-hidden="true" className="display-1 text-center mb-3">
          💔
        </div>
        <CardTitle className="text-center">
          There's no content on this page, please{" "}
          <a target="_blank" rel="noreferrer" href={`${DASHBOARD_URL}/support`}>
            report
          </a>{" "}
          it to us.
        </CardTitle>
      </div>
    </article>
  );
}
