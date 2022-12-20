import * as React from "react";
import type { EditorState } from "./EditorTypes";

export default function EditorView({
  currentPage,
  materialPages,
  selectedMaterialPage,
}: EditorState) {
  // References.
  const editorRef = React.createRef();

  // There's either a single entry or nothing at all.
  const materialPage = materialPages[0];

  return <div>Editor</div>;
}
