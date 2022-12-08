import * as React from "react";
import useUser from "@Core/Hooks/useUser";
import { baseConfig } from "@Core/Config";
import useDocumentHead from "@Core/Hooks/useDocumentHead";
import TwoSectionLayout from "@Presentation/Layouts/TwoSectionLayout/TwoSectionLayout";

// Static.
import styles from "./Viewer.module.css";

// Features.
import ViewerViewModel from "./ViewerViewModel";
import ViewerFrame from "./ViewerFrame/ViewerFrame";
import ViewerErrorViewport from "./ViewerErrorViewport";
import ViewerSidebar from "./ViewerSidebar/ViewerSidebar";
import { ProfileDropdown } from "@Presentation/Components/Dropdowns";

function Viewer() {
  const user = useUser();

  useDocumentHead({
    title: `View your learning materials | ${baseConfig.APP_NAME} - ${baseConfig.BRAND_NAME}`,
    description: `Interact with the learning materials that you've purchased eloquently. ${baseConfig.BRAND_NAME} has you covered.`,
  });

  return (
    <TwoSectionLayout header={<ProfileDropdown {...{ user }} />}>
      {({ contentCLassName }) => (
        <ViewerViewModel>
          <main
            className={`bg-light text-dark text-secondary ${contentCLassName} ${styles.container}`}
          >
            <ViewerSidebar />
            <ViewerFrame />
            {/* Errors. */}
            <ViewerErrorViewport />
          </main>
        </ViewerViewModel>
      )}
    </TwoSectionLayout>
  );
}

export default Viewer;
