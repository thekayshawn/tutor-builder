import * as React from "react";
import { Button } from "reactstrap";
import EditorContext from "../EditorContext";
import { MAX_PAGES_PER_MATERIAL } from "src/env";
import { messages } from "@Core/Helpers/strings";
import { IconCirclePlus, IconTrash } from "@tabler/icons";

// Types.
import type { EditorHeaderState } from "../EditorTypes";

export default function EditorHeader({
  onClickAdd,
  onClickSave,
  onClickRemove,
  onClickSaveAndContinue,
}: EditorHeaderState) {
  const { state } = React.useContext(EditorContext);

  const isPageNumThresholdReached =
    state.materialPages.length >= MAX_PAGES_PER_MATERIAL;

  return (
    <nav className="d-flex gap-2">
      <button
        onClick={onClickAdd}
        disabled={isPageNumThresholdReached}
        className="btn border rounded bg-light fs-5"
        title={
          isPageNumThresholdReached
            ? messages.THRESHOLD_BREACHED(MAX_PAGES_PER_MATERIAL, "pages")
            : "Add a page"
        }
      >
        <IconCirclePlus />
      </button>
      <button
        title="Remove this page"
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
      <Button type="button" color="secondary" onClick={onClickSaveAndContinue}>
        Save & Continue
      </Button>
    </nav>
  );
}
