import * as React from "react";
import { EditorState } from "./EditorTypes";
import EditorContext, { defaultEditorState } from "./EditorContext";
import { useParams } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

/**
 * ViewModel for the Builder's editor view.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function EditorViewModel({ children }: Props): JSX.Element {
  const { page = "1" } = useParams<{ page: string }>();

  const [state, setState] = React.useState<EditorState>({
    ...defaultEditorState,
    currentPage: parseInt(page),
  });

  console.log(state.selectedMaterialPage);

  return (
    <EditorContext.Provider value={{ state, setState }}>
      {children}
    </EditorContext.Provider>
  );
}
