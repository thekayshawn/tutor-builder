import * as React from "react";
import View from "./EditorView";
import ViewModel from "./EditorViewModel";
import EditorViewIdle from "./EditorViewIdle";
import { Error500 } from "src/components/error";
import Loader from "src/components/loader/loader";
import BuilderErrorViewport from "../BuilderErrorViewport";

export default function Editor() {
  return (
    <>
      <BuilderErrorViewport />
      <ViewModel>
        {({ requestState }) =>
          requestState.status === "idle" ? (
            <EditorViewIdle />
          ) : requestState.status === "erred" ? (
            <Error500 />
          ) : requestState.status === "loading" ? (
            <Loader />
          ) : (
            <View />
          )
        }
      </ViewModel>
    </>
  );
}
