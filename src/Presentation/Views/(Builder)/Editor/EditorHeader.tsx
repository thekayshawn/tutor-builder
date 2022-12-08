import * as React from "react";
import { Button } from "reactstrap";
import { MAX_PAGES_PER_MATERIAL } from "src/env";
import { messages } from "@Core/Helpers/strings";
import { IconCirclePlus, IconTrash } from "@tabler/icons";

type Props = {
  /**
   * The total number of pages added so far.
   */
  numOfPages: number;

  /**
   * Event listener for the add button's click event.
   */
  onClickAdd: () => void;

  /**
   * Event listener for the remove button's click event.
   */
  onClickRemove: () => void;

  /**
   * Event listener for the save button's click event.
   */
  onClickSave: () => void;

  /**
   * Event listener for the save & continue button's click event.
   */
  onClickSaveAndContinue: () => void;
} & React.ComponentPropsWithoutRef<"div">;

export default function EditorHeader({
  numOfPages,
  onClickAdd,
  onClickRemove,
  onClickSave,
  onClickSaveAndContinue,
  style,
  className = "",
}: Props) {
  const isPageNumThresholdReached = numOfPages <= MAX_PAGES_PER_MATERIAL;

  return (
    <div
      className={`is-ui ui_save_content gap-2 ${className}`}
      style={{
        ...style,
        position: "fixed",
        top: "1.225rem",
        right: "1rem",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
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
      <Button type="button" color="secondary" onClick={onClickSaveAndContinue}>
        Save & Continue
      </Button>
    </div>
  );
}
