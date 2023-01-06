import * as React from "react";
import EditorContext from "../EditorContext";
import useLearningMaterialPageContent from "@Core/Hooks/learning-materials/useLearningMaterialPageContent";

// Types.
import type { RequestState } from "@Data/Types";
import type { EditorInterfaceState } from "../EditorTypes";

/**
 * Local props.
 */
type Props = {
  children: ({ requestState }: { requestState: RequestState }) => JSX.Element;
};

/**
 * ViewModel for the Builder's editor-interface.
 * Fetches the content of the selected page and provides it to the view.
 *
 * @returns {JSX.Element}
 */
export default function EditorInterfaceViewModel({
  children,
}: Props): JSX.Element {
  const { state, helpers } = React.useContext(EditorContext);

  // Local state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    // A page hasn't been selected or the ID is missing.
    status: "loading",
  });

  useLearningMaterialPageContent({
    selectedMaterialPage: state.selectedMaterialPage!,
    onChangeRequestState: (newState) => setRequestState(newState),
    onSuccess: (data) => {
      helpers.ref.pageContent = data;
      setRequestState({ status: "loaded" });
    },
  });

  return children({
    requestState,
  });
}
