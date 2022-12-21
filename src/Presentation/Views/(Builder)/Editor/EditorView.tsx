import * as React from "react";
import EditorHeader from "./EditorHeader";
import EditorFooter from "./EditorFooter/EditorFooter";

// Static.
import styles from "./Editor.module.css";

// Types.
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

  return (
    <main className={`bg-light ${styles.editor}`}>
      <EditorHeader
        numOfPages={0}
        onClickAdd={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClickRemove={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClickSave={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClickSaveAndContinue={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <EditorFooter />
    </main>
  );
}
