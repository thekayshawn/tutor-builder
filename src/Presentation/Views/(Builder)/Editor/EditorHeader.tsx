import * as React from "react";
import { Button } from "reactstrap";
import { MAX_PAGES_PER_MATERIAL } from "src/env";
import { messages } from "@Core/Helpers/strings";
import { IconCirclePlus, IconTrash } from "@tabler/icons";

// Types.
import type { EditorHeaderState } from "./EditorTypes";

// Static.
import styles from "./Editor.module.css";

export default function EditorHeader({
  numOfPages,
  onClickAdd,
  onClickSave,
  onClickRemove,
  onClickSaveAndContinue,
  className = "",
}: EditorHeaderState) {
  const isPageNumThresholdReached = numOfPages <= MAX_PAGES_PER_MATERIAL;

  return (
    <header className={`${styles.header} ${className}`}>
      <nav>
        <button
          role="tooltip"
          onClick={onClickAdd}
          data-microtip-position="bottom"
          disabled={isPageNumThresholdReached}
          className="btn border rounded bg-light fs-5"
          aria-label={
            isPageNumThresholdReached
              ? "Add a page"
              : messages.THRESHOLD_BREACHED(MAX_PAGES_PER_MATERIAL, "pages")
          }
        >
          <IconCirclePlus />
        </button>
        <button
          role="tooltip"
          aria-label="Remove this page"
          data-microtip-position="bottom"
          className="btn border rounded bg-light fs-5"
          onClick={() => {
            if (window.confirm("Are you sure about that?")) {
              onClickRemove();
            }
          }}
        >
          <IconTrash />
        </button>
        <Button type="button" color="secondary" onClick={onClickSave}>
          Save
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={onClickSaveAndContinue}
        >
          Save & Continue
        </Button>
      </nav>
    </header>
  );
}
