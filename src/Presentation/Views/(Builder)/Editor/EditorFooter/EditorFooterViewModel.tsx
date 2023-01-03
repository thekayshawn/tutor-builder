import * as React from "react";
import { useHistory } from "react-router-dom";
import EditorContext, { EDITOR_ID } from "../EditorContext";
import { getEditorRoute } from "@Core/Helpers/routerFunctions";

// Types.
import type { EditorFooterState } from "../EditorTypes";

type Props = {
  children: (_: EditorFooterState) => JSX.Element;
};

export default function EditorFooterViewModel({ children }: Props) {
  const history = useHistory();
  const { bag } = React.useContext(EditorContext);

  function onRequestFullscreen() {
    document.getElementById(EDITOR_ID)?.requestFullscreen();
  }

  function onChangePage(newPage: number) {
    history.push(
      getEditorRoute({
        page: newPage,
        slug: bag.currentSlug,
        id: bag.selectedMaterialPage?.id,
      })
    );
  }

  return children({
    onChangePage,
    onRequestFullscreen,
  });
}
