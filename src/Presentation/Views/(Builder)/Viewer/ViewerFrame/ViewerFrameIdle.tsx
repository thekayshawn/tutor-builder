import * as React from "react";
import { CardTitle } from "reactstrap";

export default function ViewerFrameIdle() {
  return (
    <article
      style={{ maxWidth: "40rem" }}
      className="h-100 w-100 mx-auto position-relative"
    >
      {/* Middle section. */}
      <div className="position-absolute top-50 start-50 translate-middle">
        <div aria-hidden="true" className="display-1 text-center mb-3">
          🙌
        </div>
        <CardTitle className="text-center">
          Select a page from the sidebar to begin the game.
        </CardTitle>
      </div>
    </article>
  );
}
