import * as React from "react";
import { ViewerState } from "./ViewerTypes";

export const defaultViewerState: ViewerState = {
  materialPages: [],
  selectedMaterialPage: undefined,
};

const ViewerContext = React.createContext({
  state: defaultViewerState,
  setState: (newState: ViewerState) => {},
});

export default ViewerContext;
