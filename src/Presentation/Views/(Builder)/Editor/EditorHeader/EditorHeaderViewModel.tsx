import * as React from "react";
import EditorContext from "../EditorContext";
import { messages } from "@Core/Helpers/strings";
import { MAX_PAGES_PER_MATERIAL } from "@Core/env";
import betterToast from "@Core/Helpers/betterToast";

// Types.
import type { EditorHeaderState } from "../EditorTypes";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

type Props = {
  children: (_: EditorHeaderState) => JSX.Element;
};

export default function EditorHeaderViewModel({ children }: Props) {
  const { ref, state, helpers, handlers } = React.useContext(EditorContext);

  function onAdd(page: Omit<LearningMaterialPage, "materialID">) {
    if (state.materialPages.length >= MAX_PAGES_PER_MATERIAL) {
      betterToast.error({
        description: messages.THRESHOLD_BREACHED(
          "pages",
          MAX_PAGES_PER_MATERIAL
        ),
      });
      return;
    }

    // Add new page
    handlers.handlePageAdd({
      ...page,
      materialID: state.selectedMaterialPage!.materialID,
    });
  }

  /**
   * Listener for the save button.
   * @returns {void}
   */
  function onSave(): void {
    // Guard clause.
    if (!ref!.pageContent!.current) {
      betterToast.error();
      return;
    }

    handlers.handlePageSave({
      ...ref!.pageContent!.current,
      htmlMarkup: ref!.editor.current?.getHTML(),
    });
  }

  function onRemove() {}

  function onSaveAndContinue() {}

  return children({
    onAdd,
    onSave,
    onRemove,
    onSaveAndContinue,
  });
}
