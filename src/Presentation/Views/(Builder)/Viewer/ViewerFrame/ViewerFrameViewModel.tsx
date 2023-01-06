import * as React from "react";

// Features.
import ViewerContext from "../ViewerContext";

// Types.
import type { RequestState } from "@Data/Types";
import { LearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";
import useLearningMaterialPageContent from "@Core/Hooks/learning-materials/useLearningMaterialPageContent";

type ViewerFrameState = {
  pageContent?: LearningMaterialPageContent;
} & RequestState;

type Props = {
  children: (props: ViewerFrameState & { refresh: Function }) => JSX.Element;
};

/**
 * ViewModel of the Viewer's Frame View.
 *
 * Fetches the selected learning material's page content and provides it to the
 * view.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function ViewerFrameViewModel({ children }: Props): JSX.Element {
  const { state } = React.useContext(ViewerContext);
  const { selectedMaterialPage } = state;

  // Local state.
  const [viewState, setViewState] = React.useState<ViewerFrameState>({
    status: "idle",
  });

  // Refresher.
  // Can be used to force refresh the view.
  const [refresh, setRefresh] = React.useState<number>(0);

  useLearningMaterialPageContent({
    additionalDeps: [refresh],
    selectedMaterialPage: selectedMaterialPage!,
    onChangeRequestState: (newState) =>
      setViewState({ ...viewState, ...newState }),
    onSuccess: (data) =>
      setViewState({ ...viewState, status: "loaded", pageContent: data }),
  });

  return children({
    ...viewState,
    refresh: () => setRefresh((last) => last + 1),
  });
}
