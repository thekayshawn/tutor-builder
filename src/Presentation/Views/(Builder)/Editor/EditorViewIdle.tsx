import * as React from "react";
import { Button, CardTitle } from "reactstrap";

export default function EditorViewIdle() {
  return (
    <article
      style={{ maxWidth: "40rem" }}
      className="position-fixed mb-0 min-vw-100 min-vh-100 top-0 d-flex flex-column align-items-center justify-content-center z-10"
    >
      {/* Middle section. */}
      <div className="position-absolute top-50 start-50 translate-middle">
        <div aria-hidden="true" className="display-1 text-center mb-3">
          🙌
        </div>
        <CardTitle className="text-center">
          Did you resize the screen? Please reload the page to begin
        </CardTitle>
        <div className="text-center">
          <Button color="secondary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    </article>
  );
}
