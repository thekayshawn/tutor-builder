import * as React from "react";
import { Button } from "reactstrap";
import { IconTrash } from "@tabler/icons";
import EditorContext from "../EditorContext";
import { MAX_PAGES_PER_MATERIAL } from "src/env";
import { messages } from "@Core/Helpers/strings";

// Types.
import type { EditorHeaderState } from "../EditorTypes";
import EditorAddPageModal from "../Modals/EditorAddPageModal";

export default function EditorHeader({
  onAdd,
  onSave,
  onRemove,
  onSaveAndContinue,
}: EditorHeaderState) {
  const { state } = React.useContext(EditorContext);

  const isPageNumThresholdReached =
    state.materialPages.length >= MAX_PAGES_PER_MATERIAL;

  const addButtonTitle = isPageNumThresholdReached
    ? messages.THRESHOLD_BREACHED("pages", MAX_PAGES_PER_MATERIAL)
    : "Add a page";

  return (
    <nav className="d-flex gap-2">
      <EditorAddPageModal
        onAdd={onAdd}
        controlProps={{
          title: addButtonTitle,
        }}
      />
      <button
        title="Remove this page"
        onClick={() => onRemove()}
        className="btn border rounded bg-light fs-5"
      >
        <IconTrash />
      </button>
      <Button type="button" color="secondary" onClick={() => onSave()}>
        Save
      </Button>
      <Button
        type="button"
        color="secondary"
        onClick={() => onSaveAndContinue()}
      >
        Save & Continue
      </Button>
    </nav>
  );
}
