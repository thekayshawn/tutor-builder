import * as React from "react";
import View from "./EditorFooterView";
import ViewModel from "./EditorFooterViewModel";

export default function EditorFooter(props: any) {
  return <ViewModel>{(state) => <View {...state} {...props} />}</ViewModel>;
}
