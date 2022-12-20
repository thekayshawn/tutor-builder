import * as React from "react";
import View from "./EditorView";
import ViewModel from "./EditorViewModel";
import { Error500 } from "src/components/error";
import Loader from "src/components/loader/loader";

export default function Editor() {
  return (
    <ViewModel>
      {({ requestState, ...rest }) =>
        requestState.status === "erred" ? (
          <Error500 />
        ) : requestState.status === "loading" ? (
          <Loader />
        ) : (
          <View {...rest} />
        )
      }
    </ViewModel>
  );
}
