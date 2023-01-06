import * as React from "react";
import View from "./EditorInterfaceView";
import { Error500 } from "src/components/error";
import Loader from "src/components/loader/loader";
import ViewModel from "./EditorInterfaceViewModel";
import "./EditorInterface.css";

export default function EditorInterface() {
  return (
    <ViewModel>
      {({ requestState }) =>
        requestState.status === "erred" ? (
          <Error500 />
        ) : requestState.status === "loading" ? (
          <Loader />
        ) : (
          <View />
        )
      }
    </ViewModel>
  );
}
