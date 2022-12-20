import * as React from "react";
import { useHistory } from "react-router-dom";
import { EditorFooterState } from "../EditorTypes";
import EditorContext, { EDITOR_ID } from "../EditorContext";
import { getEditorRoute } from "@Core/Helpers/routerFunctions";

type Props = {
  children: (_: EditorFooterState) => JSX.Element;
};

export default function EditorFooterViewModel({ children }: Props) {
  const history = useHistory();
  const { state } = React.useContext(EditorContext);

  const { selectedMaterialPage } = state;

  function onRequestFullscreen() {
    document.getElementById(EDITOR_ID)?.requestFullscreen();
  }

  function onChangePage(newPage: number) {
    history.push(
      getEditorRoute({
        page: newPage,
        id: selectedMaterialPage?.id,
        slug: `page-number-${selectedMaterialPage?.id}`,
      })
    );
  }

  return children({
    ...state,
    onChangePage,
    onRequestFullscreen,
  });
}
