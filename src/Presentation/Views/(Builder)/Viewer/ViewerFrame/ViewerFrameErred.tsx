import * as React from "react";
import { Button, CardTitle } from "reactstrap";
import { DASHBOARD_URL } from "src/constants";

export default function ViewerFrameErred({
  refreshListener,
}: {
  refreshListener: Function;
}) {
  return (
    <article
      style={{ maxWidth: "40rem" }}
      className="h-100 w-100 mx-auto position-relative"
    >
      {/* Middle section. */}
      <div className="position-absolute top-50 start-50 translate-middle">
        <div aria-hidden="true" className="display-1 text-center mb-3">
          🥲
        </div>
        <CardTitle className="text-center">
          Not everything is perfect eh?
        </CardTitle>
        <CardTitle className="text-center">
          There was an error, please try to refresh the page and, in the worst
          of cases,{" "}
          <a target="_blank" rel="noreferrer" href={`${DASHBOARD_URL}/support`}>
            contact support.
          </a>
        </CardTitle>
        <Button
          color="secondary"
          className="w-100 mt-3"
          onClick={() => refreshListener()}
        >
          Refresh
        </Button>
      </div>
    </article>
  );
}
