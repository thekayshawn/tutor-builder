import * as React from "react";
import EditorContext from "../EditorContext";
import { builderConfig } from "@Core/Config";
import { SnippetHandle } from "@Presentation/Components";
import BuilderControl from "src/components/contentbuilder/buildercontrol";

export default function EditorInterfaceView() {
  const { ref } = React.useContext(EditorContext);

  return (
    <>
      <SnippetHandle />
      <BuilderControl
        ref={ref!.editor}
        {...builderConfig}
        base64Handler="/upload"
        imageSelect="images.html"
        largerImageHandler="/upload"
        languageFile="/contentbuilder/lang/en.js"
        snippetFile="/assets/minimalist-blocks/content.js"
        initialHtml={ref!.pageContent!.current?.htmlMarkup}
      />
    </>
  );
}
