import * as React from "react";
import View from "./EditorFooterView";
import ViewModel from "./EditorFooterViewModel";

export default function EditorFooter() {
  return <ViewModel>{(props) => <View {...props} />}</ViewModel>;
}
