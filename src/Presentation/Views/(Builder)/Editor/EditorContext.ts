import * as React from "react";
import type { EditorState, EditorHelpers } from "./EditorTypes";

export const defaultEditorState: EditorState = {
  materialPages: [],
  selectedMaterialPage: undefined,
};

export const defaultEditorHelpers: EditorHelpers = {
  currentPage: 1,
  currentSlug: "",
};

export const defaultEditorBag = {
  ...defaultEditorState,
  ...defaultEditorHelpers,
};

const EditorContext = React.createContext({
  bag: defaultEditorBag,
  setState: (_: EditorState) => {},
});

export default EditorContext;
export const EDITOR_ID = "mainContent";
