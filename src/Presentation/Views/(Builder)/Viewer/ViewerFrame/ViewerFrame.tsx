import * as React from "react";
import * as DOMPurify from "dompurify";
import Loader from "src/components/loader/loader";

// Features.
import ViewModel from "./ViewerFrameViewModel";
import ViewerFrameIdle from "./ViewerFrameIdle";
import ViewerFrameErred from "./ViewerFrameErred";
import ViewerFrameEmpty from "./ViewerFrameEmpty";

// Static.
import "./ViewerFrame.css";
import styles from "../Viewer.module.css";

/**
 * View for the frame that displays the content of a page, in the Builder's
 * Viewer.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
function ViewerFrame(): JSX.Element {
  return (
    <div className={`bg-white ${styles.article}`}>
      <ViewModel>
        {({ status, pageContent, refresh }) =>
          // A page hasn't been selected yet.
          status === "idle" ? (
            <ViewerFrameIdle />
          ) : // There was an error loading the page's content.
          status === "erred" ? (
            <ViewerFrameErred refreshListener={refresh} />
          ) : // The content is being loaded.
          status === "loading" ? (
            <Loader
              isInline
              className="position-absolute top-50 start-50 translate-middle"
            />
          ) : // The loaded content is empty.
          !pageContent?.htmlMarkup ? (
            <ViewerFrameEmpty />
          ) : (
            // Good to go.
            <article
              className="p-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(pageContent.htmlMarkup),
              }}
            />
          )
        }
      </ViewModel>
    </div>
  );
}

export default ViewerFrame;
