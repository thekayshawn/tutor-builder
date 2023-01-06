import * as React from "react";
import BuilderControl from "src/components/contentbuilder/buildercontrol";

import type {
  EditorBag,
  EditorState,
  EditorHelpers,
  EditorHandlers,
} from "./EditorTypes";

export const defaultEditorState: EditorState = {
  materialPages: [],
  selectedMaterialPage: undefined,
};

export const defaultEditorHelpers: EditorHelpers = {
  currentPage: 1,
  currentSlug: "",
  ref: {
    editor: React.createRef<BuilderControl>(),
  },
};

export const defaultEditorHandlers: EditorHandlers = {
  handlePageAdd: () => {},
  handlePageSave: () => {},
  handlePageRemove: () => {},
  handlePageSaveAndContinue: () => {},
};

export const defaultEditorBag: EditorBag = {
  state: defaultEditorState,
  helpers: defaultEditorHelpers,
  handlers: defaultEditorHandlers,
};

const EditorContext = React.createContext<
  EditorBag & {
    setState: (_: EditorState) => unknown;
  }
>({
  ...defaultEditorBag,
  setState: (_: EditorState) => {},
});

export default EditorContext;
export const EDITOR_ID = "main_content";
