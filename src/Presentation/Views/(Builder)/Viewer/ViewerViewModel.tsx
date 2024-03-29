import * as React from "react";
import { ViewerState } from "./ViewerTypes";
import ViewerContext, { defaultViewerState } from "./ViewerContext";

type Props = {
  children: React.ReactElement;
};

/**
 * ViewModel for the Builder's viewer view.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function ViewerViewModel({ children }: Props): JSX.Element {
  const [state, setState] = React.useState<ViewerState>(defaultViewerState);

  return (
    <ViewerContext.Provider value={{ state, setState }}>
      {children}
    </ViewerContext.Provider>
  );
}
