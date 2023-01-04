import * as React from "react";
import { EditorInterfaceState } from "../EditorTypes";
import { builderConfig } from "@Core/Config";
import BuilderControl from "src/components/contentbuilder/buildercontrol";
import { SnippetHandle } from "@Presentation/Components";

export default function EditorInterfaceView({
  pageContent,
}: {
  pageContent: EditorInterfaceState["pageContent"];
}) {
  const editorRef = React.createRef<BuilderControl>();

  return (
    <>
      <SnippetHandle />
      <BuilderControl
        ref={editorRef}
        base64Handler="/upload"
        imageSelect="images.html"
        largerImageHandler="/upload"
        initialHtml={pageContent?.htmlMarkup}
        languageFile="/contentbuilder/lang/en.js"
        snippetFile="/assets/minimalist-blocks/content.js"
        {...builderConfig}
      />
    </>
  );
}
