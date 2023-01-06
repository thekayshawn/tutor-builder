import * as React from "react";
import View from "./EditorHeaderView";
import ViewModel from "./EditorHeaderViewModel";

export default function EditorHeader() {
  return <ViewModel>{(props) => <View {...props} />}</ViewModel>;
}
