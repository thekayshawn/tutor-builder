import useApiEffect from "../useApiEffect";
import { isNumber } from "@Core/Helpers/utils";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageAdapter from "@Data/Adapters/LearningMaterialPageAdapter";

// Types.
import type { Boolbacks, RequestState } from "@Data/Types";
import type {
  LearningMaterialPage,
  RawLearningMaterialPage,
} from "@Data/Entities/LearningMaterialPageEntity";

type Props = {
  id?: string;

  /**
   * Method that updates the local request state.
   */
  onChangeRequestState: (newState: RequestState) => void;

  /**
   * Callback in case of a successful fetch.
   */
  onSuccess: Boolbacks<LearningMaterialPage[]>["onSuccess"];
};

/**
 * Hooks into the LearningMaterialPage collection.
 *
 * @param {Props} props
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function useLearningMaterialPages({
  id,
  onSuccess,
  onChangeRequestState,
}: Props) {
  const service = new LearningMaterialService();
  const matPageAdapter = new LearningMaterialPageAdapter();

  useApiEffect(() => {
    // Guard clause.
    if (!isNumber(id)) return;

    // Notice the type coercion.
    service.getPages<{ data: RawLearningMaterialPage[] }>({
      id,
      onFailure: (message) => {
        // Results in a complete halt.
        onChangeRequestState({ message, status: "erred" });
      },
      onSuccess: ({ data }) => {
        // The request has been successful.
        onChangeRequestState({ status: "loaded" });

        // Time to adapt the data and return.
        onSuccess(
          data.map((record) =>
            // Notice that the records are originally of the type
            // RawLearningMaterialPage. We need to deserialize the individual
            // records.
            matPageAdapter.deserialize(record)
          )
        );
      },
    });
  }, [id]);
}
