import * as React from "react";
import EditorContext from "../EditorContext";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageContentAdapter from "@Data/Adapters/LearningMaterialPageContentAdapter";

// Types.
import type { EditorInterfaceState } from "../EditorTypes";
import type { RawLearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";
import useLearningMaterialPageContent from "@Core/Hooks/learning-materials/useLearningMaterialPageContent";

/**
 * Local props.
 */
type Props = {
  children: (_: EditorInterfaceState) => JSX.Element;
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
  const { bag } = React.useContext(EditorContext);

  // Local state.
  const [viewState, setViewState] = React.useState<EditorInterfaceState>({
    // A page hasn't been selected or the ID is missing.
    status: "loading",
  });

  useLearningMaterialPageContent({
    selectedMaterialPage: bag.selectedMaterialPage!,
    onChangeRequestState: (newState) =>
      setViewState({ ...viewState, ...newState }),
    onSuccess: (data) =>
      setViewState({ ...viewState, status: "loaded", pageContent: data }),
  });

  return children(viewState);
}
