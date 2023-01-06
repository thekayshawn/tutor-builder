import * as React from "react";
import { DocumentHeadProps } from "@Data/Types";

export default function useDocumentHead({
  title,
  description = "",
}: DocumentHeadProps) {
  React.useEffect(() => {
    const previousTitle = document.title;
    const descriptionElement = document.head.querySelector(
      'meta[name="description"]'
    );
    const previousDescription = descriptionElement?.getAttribute("content");

    // Set currently required meta data.
    document.title = title;
    descriptionElement?.setAttribute("content", description);

    return () => {
      // Set the previous meta data on unmount.
      document.title = previousTitle;
      previousDescription &&
        descriptionElement?.setAttribute("content", previousDescription);
    };
  }, []);
}
