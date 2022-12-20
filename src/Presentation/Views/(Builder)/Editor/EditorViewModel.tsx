import * as React from "react";
import { EditorState } from "./EditorTypes";
import { useParams } from "react-router-dom";
import EditorContext, { defaultEditorState } from "./EditorContext";
import useLearningMaterialPages from "@Core/Hooks/learning-materials/useLearningMaterialPages";
import { RequestState } from "@Data/Types";

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
  const { page = "1", id: materialID } = useParams<{
    id?: string;
    page: string;
  }>();

  const [state, setState] = React.useState<EditorState>({
    ...defaultEditorState,
    currentPage: parseInt(page),
  });

  // Local request state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    status: "loading",
  });

  // Fetch the pages by ID.
  useLearningMaterialPages({
    id: materialID,
    onSuccess: (data) => ({
      ...requestState,
      materialPages: data,
    }),
    onChangeRequestState: (newState) => setRequestState(newState),
  });

  console.log(state.selectedMaterialPage);

  return (
    <EditorContext.Provider value={{ state, setState }}>
      {children({ requestState, ...state })}
    </EditorContext.Provider>
  );
}
