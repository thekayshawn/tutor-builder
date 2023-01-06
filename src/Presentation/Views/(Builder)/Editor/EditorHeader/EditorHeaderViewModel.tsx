import * as React from "react";
import EditorContext from "../EditorContext";
import betterToast from "@Core/Helpers/betterToast";

// Types.
import type { EditorHeaderState } from "../EditorTypes";
import { MAX_PAGES_PER_MATERIAL } from "@Core/env";
import strings from "@Core/Helpers/strings";

type Props = {
  children: (_: EditorHeaderState) => JSX.Element;
};

export default function EditorHeaderViewModel({ children }: Props) {
  const { state, helpers, handlers } = React.useContext(EditorContext);
  const { pageContent } = helpers.ref;

  function onClickAdd() {
    if (state.materialPages.length >= MAX_PAGES_PER_MATERIAL) {
      betterToast.error({
        description: strings.THRESHOLD_REACHED("pages", MAX_PAGES_PER_MATERIAL),
      });
      return;
    }

    // TODO: Add new pages
    // handlers.handlePageAdd();
  }

  /**
   * Listener for the save button.
   * @returns {void}
   */
  function onClickSave(): void {
    // Guard clause.
    if (!pageContent) {
      betterToast.error();
      return;
    }

    handlers.handlePageSave({
      ...pageContent,
      htmlMarkup: helpers.ref.editor.current?.getHTML(),
    });
  }

  function onClickRemove() {}

  function onClickSaveAndContinue() {}

  return children({
    onClickAdd,
    onClickSave,
    onClickRemove,
    onClickSaveAndContinue,
  });
}
