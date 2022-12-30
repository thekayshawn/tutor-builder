import * as React from "react";
import { EditorState } from "./EditorTypes";

export const defaultEditorState: EditorState = {
  slug: "",
  currentPage: 1,
  materialPages: [],
  selectedMaterialPage: undefined,
};

const EditorContext = React.createContext({
  state: defaultEditorState,
  setState: (_: EditorState) => {},
});

export default EditorContext;
export const EDITOR_ID = "mainContent";
