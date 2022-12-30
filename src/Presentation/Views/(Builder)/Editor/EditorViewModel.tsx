import * as React from "react";
import { RequestState } from "@Data/Types";
import { EditorState } from "./EditorTypes";
import { useParams } from "react-router-dom";
import EditorContext, { defaultEditorState } from "./EditorContext";
import useLearningMaterialPages from "@Core/Hooks/learning-materials/useLearningMaterialPages";

type Children = { requestState: RequestState } & EditorState;

type Props = {
  children: ({ requestState }: Children) => JSX.Element;
};

/**
 * ViewModel for the Builder's editor view.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function EditorViewModel({ children }: Props): JSX.Element {
  // The ID is always in the URL.
  const {
    slug,
    page = "1",
    id: materialID,
  } = useParams<{
    id?: string;
    page: string;
    slug: string;
  }>();

  const [state, setState] = React.useState<EditorState>({
    ...defaultEditorState,
    slug,
    currentPage: parseInt(page),
  });

  // Local request state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    status: "loading",
  });

  // Fetch the pages by ID.
  useLearningMaterialPages({
    id: materialID,
    onSuccess: (data) =>
      setState({
        ...state,
        materialPages: data,
      }),
    onChangeRequestState: (newState) => setRequestState(newState),
  });

  return (
    <EditorContext.Provider value={{ state, setState }}>
      {children({ requestState, ...state })}
    </EditorContext.Provider>
  );
}
