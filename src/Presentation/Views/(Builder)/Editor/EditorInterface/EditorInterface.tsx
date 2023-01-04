import * as React from "react";
import View from "./EditorInterfaceView";
import { Error500 } from "src/components/error";
import Loader from "src/components/loader/loader";
import ViewModel from "./EditorInterfaceViewModel";
import "./EditorInterface.css";

export default function EditorInterface() {
  return (
    <ViewModel>
      {({ status, ...restState }) =>
        status === "erred" ? (
          <Error500 />
        ) : status === "loading" ? (
          <Loader />
        ) : (
          <View pageContent={restState.pageContent} />
        )
      }
    </ViewModel>
  );
}
