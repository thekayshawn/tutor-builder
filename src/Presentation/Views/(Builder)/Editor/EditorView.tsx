import * as React from "react";
import EditorHeader from "./EditorHeader";
import EditorContext from "./EditorContext";
import EditorFooter from "./EditorFooter/EditorFooter";
import EditorInterface from "./EditorInterface/EditorInterface";

// Static.
import styles from "./Editor.module.css";

// Types.
import TwoSectionLayout from "@Presentation/Layouts/TwoSectionLayout/TwoSectionLayout";

export default function EditorView() {
  const { bag } = React.useContext(EditorContext);

  return (
    <TwoSectionLayout
      header={
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
      }
    >
      {({ contentClassName }) => (
        <main className={`bg-light ${contentClassName} ${styles.container}`}>
          <EditorInterface />
          <EditorFooter />
        </main>
      )}
    </TwoSectionLayout>
  );
}
