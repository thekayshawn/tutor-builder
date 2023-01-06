import * as React from "react";
import EditorContext from "../EditorContext";
import { builderConfig } from "@Core/Config";
import { SnippetHandle } from "@Presentation/Components";
import BuilderControl from "src/components/contentbuilder/buildercontrol";

// Types.
import type { EditorInterfaceState } from "../EditorTypes";

export default function EditorInterfaceView() {
  const { helpers } = React.useContext(EditorContext);
  const { ref } = helpers;

  return (
    <>
      <SnippetHandle />
      <BuilderControl
        {...builderConfig}
        ref={ref.editor}
        base64Handler="/upload"
        imageSelect="images.html"
        largerImageHandler="/upload"
        initialHtml={ref.pageContent?.htmlMarkup}
        languageFile="/contentbuilder/lang/en.js"
        snippetFile="/assets/minimalist-blocks/content.js"
      />
    </>
  );
}
