import type { EditorRef } from "./EditorTypes";

export function isEditorRef(ref: any): ref is EditorRef {
  return ref && ref.pageContent;
}
