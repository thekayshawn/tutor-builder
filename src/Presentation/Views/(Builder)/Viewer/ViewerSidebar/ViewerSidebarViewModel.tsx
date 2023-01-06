import * as React from "react";
import { useParams } from "react-router-dom";
import { MIN_WIDTH_BUILDER } from "@Core/env";
import useLearningMaterialPages from "@Core/Hooks/learning-materials/useLearningMaterialPages";

// Features.
import ViewerContext from "../ViewerContext";

// Types.
import type { RequestState } from "@Data/Types";
import type { ViewerState } from "../ViewerTypes";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

type Props = {
  children: ({
    state,
    onClickPage,
    requestState,
  }: {
    state: ViewerState;
    requestState: RequestState;
    onClickPage: (page: LearningMaterialPage) => void;
  }) => JSX.Element;
};

/**
 * ViewModel for the viewer's frame view.
 *
 * Requests the content of the selected page, if it's selected, and provided it
 * to the view.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function ViewerSidebarViewModel({
  children,
}: Props): JSX.Element {
  // The ID is always in the URL.
  const { id: materialID } = useParams<{
    id?: string;
  }>();

  const { state, setState } = React.useContext(ViewerContext);

  // Local request state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    status: window.screen.width < MIN_WIDTH_BUILDER ? "idle" : "loading",
  });

  // Fetch the pages by ID.
  useLearningMaterialPages({
    id: materialID,
    isIdle: requestState.status === "idle",
    onChangeRequestState: (newState) => setRequestState(newState),
    onSuccess: (data) =>
      setState({
        ...state,
        materialPages: data,
      }),
  });

  function onClickPage(page: LearningMaterialPage) {
    // If it's not the already selected page.
    if (page !== state.selectedMaterialPage) {
      setState({ ...state, selectedMaterialPage: page });

      //* The progress is now updated automatically by the API.
      // if (!isNumber(materialID) || !isNumber(page.id)) return;

      // // Also, update the progress.
      // service.updateProgress({
      //   id: materialID,
      //   entityID: page.id,
      //   onSuccess: () => {},
      //   onFailure: () => {},
      // });
    }
  }

  return children({
    state,
    onClickPage,
    requestState,
  });
}
