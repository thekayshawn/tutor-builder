import * as React from "react";
import strings from "@Core/Helpers/strings";
import useApiEffect from "@Core/Hooks/useApiEffect";

// Features.
import ViewerContext from "../ViewerContext";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";

// Types.
import type { RequestState } from "@Data/Types";
import LearningMaterialPageContentAdapter from "@Data/Adapters/LearningMaterialPageContentAdapter";
import {
  LearningMaterialPageContent,
  RawLearningMaterialPageContent,
} from "@Data/Entities/LearningMaterialPageContentEntity";

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

  useApiEffect(() => {
    // When a material isn't selected.
    if (!selectedMaterialPage) return;

    // When a material is selected but it has no ID.
    // This is an error.
    if (!selectedMaterialPage.id) {
      setViewState({ status: "erred", message: strings.DEFAULT_ERROR_MESSAGE });
      return;
    }

    // Reset the state to loading in order to display the loader between
    // consecutive page selections.
    setViewState({ status: "loading" });

    const service = new LearningMaterialService();
    const contentAdapter = new LearningMaterialPageContentAdapter();

    // Notice the type cohersion.
    service.getPageContent<{ data: RawLearningMaterialPageContent }>({
      id: selectedMaterialPage.id,
      onFailure: (message) => {
        setViewState({ message, status: "erred" });
      },
      onSuccess: ({ data }) => {
        setViewState({
          ...viewState,
          status: "loaded",
          pageContent: contentAdapter.deserialize(data),
        });
      },
    });
  }, [refresh, selectedMaterialPage]);

  return children({
    ...viewState,
    refresh: () => setRefresh((last) => last + 1),
  });
}
