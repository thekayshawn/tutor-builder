import * as React from "react";
import { useParams } from "react-router-dom";
import useApiEffect from "@Core/Hooks/useApiEffect";

// Features.
import ViewerContext from "../ViewerContext";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageAdapter from "@Data/Adapters/LearningMaterialPageAdapter";

// Types.
import type { RequestState } from "@Data/Types";
import type { ViewerState } from "../ViewerTypes";
import type {
  LearningMaterialPage,
  RawLearningMaterialPage,
} from "@Data/Entities/LearningMaterialPageEntity";
import { isNumber } from "@Core/Helpers/utils";

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
  const { id: materialID } = useParams<{
    id?: string;
  }>();

  const service = new LearningMaterialService();
  const matPageAdapter = new LearningMaterialPageAdapter();
  const { state, setState } = React.useContext(ViewerContext);

  // Local state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    status: "loading",
  });

  useApiEffect(() => {
    if (!isNumber(materialID)) return;

    // Notice the type coercion.
    service.getPages<{ data: RawLearningMaterialPage[] }>({
      id: materialID,
      onFailure: (message) => {
        setRequestState({ message, status: "erred" });
      },
      onSuccess: ({ data }) => {
        setState({
          ...requestState,
          materialPages: data.map((record) =>
            // Notice that the records are originally of the type
            // RawLearningMaterialPage. We need to deserialize the individual
            // records.
            matPageAdapter.deserialize(record)
          ),
        });

        setRequestState({ status: "loaded" });
      },
    });
  }, [materialID]);

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
