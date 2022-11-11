import * as React from "react";
import { useParams } from "react-router-dom";
import useApiEffect from "@Core/Hooks/useApiEffect";

// Features.
import ViewerContext from "../ViewerContext";
import PaginationAdapter from "@Data/Adapters/PaginationAdapter";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageAdapter from "@Data/Adapters/LearningMaterialPageAdapter";

// Types.
import type { RequestState } from "@Data/Types";
import type { ViewerState } from "../ViewerTypes";
import type { RawPaginatedEntity } from "@Data/Entities/PaginatedEntity";
import type {
  LearningMaterialPage,
  RawLearningMaterialPage,
} from "@Data/Entities/LearningMaterialPageEntity";

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

export default function ViewerSidebarViewModel({ children }: Props) {
  const { id: materialID } = useParams<{
    id?: string;
  }>();

  const { state, setState } = React.useContext(ViewerContext);

  // Local state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    status: "loading",
  });

  useApiEffect(() => {
    if (!materialID) return;

    const id = parseInt(materialID);

    if (isNaN(id)) return;

    const service = new LearningMaterialService();
    const matPageAdapter = new LearningMaterialPageAdapter();

    // Notice the type cohersion.
    // getPages is inferred with RawPaginatedEntity, which needs a type to infer
    // it's data/records property with.
    service.getPages<{ data: RawLearningMaterialPage[] }>({
      id,
      onFailure: (message) => {
        setRequestState({ message, status: "erred" });
      },
      onSuccess: ({ data }) => {
        setState({
          ...requestState,
          materialPages: data.map((record) =>
            // Notice that the records are originally of the type
            // RawLearningMaterialPage. We need to deserialize the individual
            // records before adding the pagination.
            matPageAdapter.deserialize(record)
          ),
        });

        setRequestState({ status: "loaded" });
      },
    });
  }, [materialID]);

  return children({
    state,
    requestState,
    onClickPage: (page) => setState({ ...state, selectedMaterialPage: page }),
  });
}
