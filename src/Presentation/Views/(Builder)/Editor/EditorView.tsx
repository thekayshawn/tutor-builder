import * as React from "react";
import EditorHeader from "./EditorHeader/EditorHeader";
import EditorFooter from "./EditorFooter/EditorFooter";
import EditorInterface from "./EditorInterface/EditorInterface";

// Static.
import styles from "./Editor.module.css";

// Types.
import TwoSectionLayout from "@Presentation/Layouts/TwoSectionLayout/TwoSectionLayout";

export default function EditorView() {
  return (
    <TwoSectionLayout header={<EditorHeader />}>
      {({ contentClassName }) => (
        <main className={`bg-light ${contentClassName} ${styles.container}`}>
          <EditorInterface />
          <EditorFooter />
        </main>
      )}
    </TwoSectionLayout>
  );
}
