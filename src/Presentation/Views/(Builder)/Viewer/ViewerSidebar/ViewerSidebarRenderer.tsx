import * as React from "react";
import { Alert } from "reactstrap";
import strings from "@Core/Helpers/strings";

// Types.
import type { RequestState } from "@Data/Types";
import type { ViewerState } from "../ViewerTypes";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

// Features.
import Loader from "src/components/loader/loader";
import SassyImage from "@Presentation/Components/SassyImage/SassyImage";

// Static.
import styles from "../Viewer.module.css";
import "@Presentation/Assets/css/images.css";
import gradientSrc from "@Presentation/Assets/gradients/gradient.svg";

type Props = {
  onClickPage: (page: LearningMaterialPage) => void;
  materialPages: ViewerState["materialPages"];
} & RequestState;

/**
 * Renderer for the sidebar.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function ViewerSidebarRenderer({
  status,
  message,
  onClickPage,
  materialPages,
}: Props): JSX.Element {
  return status === "erred" ? (
    <Alert color="danger" className="mb-0">
      {message || strings.DEFAULT_ERROR_MESSAGE}
    </Alert>
  ) : status === "loading" ? (
    <Loader
      isInline
      className="h-100 d-flex justify-content-center align-items-center"
    />
  ) : materialPages.length === 0 ? (
    <Alert color="primary" className="mb-0">
      {strings.DEFAULT_EMPTY_MESSAGE}
    </Alert>
  ) : (
    <ul className="p-0 m-0 d-flex flex-column gap-3">
      {materialPages.map((page) => (
        <button
          key={page.id}
          onClick={() => onClickPage(page)}
          className="p-2 w-100 bg-white border rounded focusable text-start overflow-hidden"
        >
          <div className="d-flex flex-nowrap gap-2 align-items-center">
            {/* Thumbnail. */}
            <div className={`w-100 thumbnail rounded ${styles.thumbnail}`}>
              <SassyImage src={page.thumbnail} fallbackImgSrc={gradientSrc} />
            </div>
            {/* Textual Content. */}
            <div className={`fs-6 text-secondary ${styles.text}`}>
              <div aria-label="Title" className="lh-sm text-truncate-2">
                {page.title}
              </div>
              <div className="fs-7 text-disabled text-truncate">
                {page.description}
              </div>
            </div>
          </div>
        </button>
      ))}
    </ul>
  );
}
