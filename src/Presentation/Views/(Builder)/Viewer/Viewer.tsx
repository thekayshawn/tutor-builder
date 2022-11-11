import * as React from "react";
import { baseConfig } from "../../../../Core/Config";
import useDocumentHead from "../../../../Core/Hooks/useDocumentHead";

// Static.
import styles from "./Viewer.module.css";

// Features.
import ViewerFrame from "./ViewerFrame";
import ViewerViewModel from "./ViewerViewModel";
import ViewerErrorViewport from "./ViewerErrorViewport";
import ViewerSidebar from "./ViewerSidebar/ViewerSidebar";

function Viewer() {
  useDocumentHead({
    title: `View your learning materials | ${baseConfig.APP_NAME} - ${baseConfig.BRAND_NAME}`,
    description: `Interact with the learning materials that you've purchased eloquently. ${baseConfig.BRAND_NAME} has you covered.`,
  });

  return (
    <ViewerViewModel>
      <main
        className={`bg-light text-dark min-vh-100 text-secondary ${styles.container}`}
      >
        <ViewerSidebar />
        <ViewerFrame />
        {/* Errors. */}
        <ViewerErrorViewport />
      </main>
    </ViewerViewModel>
  );
}

export default Viewer;
