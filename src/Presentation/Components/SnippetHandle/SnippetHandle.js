import ReactDOM from "react-dom";
import { useEffect } from "react";
import { builderConfig } from "../../../Core/Config";

function SnippetHandle() {
  useEffect(() => {
    let snippetHandle = document.getElementById("divSnippetHandle");

    function work() {
      if (!snippetHandle) {
        // If it still isn't rendered.
        snippetHandle = document.getElementById("divSnippetHandle");
        return;
      }

      // Stop the recursion.
      clearInterval(snippetHandleInterval);

      // The attribute is set only if the config says so.
      snippetHandle.setAttribute(
        "data-snippets-shown",
        builderConfig.snippetOpen
      );

      snippetHandle.addEventListener("click", () => {
        snippetHandle.setAttribute(
          "data-snippets-shown",
          snippetHandle.getAttribute("data-snippets-shown") === "true"
            ? false
            : true
        );
      });
    }

    // The element isn't rendered until late.
    const snippetHandleInterval = setInterval(() => {
      work();
    }, 1000);
  }, []);

  return <></>;
}

export default SnippetHandle;
