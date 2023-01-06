import useUser from "../useUser";
import useApiEffect from "../useApiEffect";
import strings from "@Core/Helpers/strings";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageContentAdapter from "@Data/Adapters/LearningMaterialPageContentAdapter";

// Types.
import type { Boolbacks, RequestState } from "@Data/Types";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";
import type {
  LearningMaterialPageContent,
  RawLearningMaterialPageContent,
} from "@Data/Entities/LearningMaterialPageContentEntity";

type Props = {
  /**
   * Additional dependencies, other than the default ones.
   */
  additionalDeps?: Array<unknown>;

  selectedMaterialPage: LearningMaterialPage;

  /**
   * Method that updates the local request state.
   */
  onChangeRequestState: (newState: RequestState) => void;

  /**
   * Callback in case of a successful fetch.
   */
  onSuccess: Boolbacks<LearningMaterialPageContent>["onSuccess"];
};

export default function useLearningMaterialPageContent({
  onSuccess,
  additionalDeps = [],
  selectedMaterialPage,
  onChangeRequestState,
}: Props) {
  const user = useUser();

  useApiEffect(() => {
    const adapter = new LearningMaterialPageContentAdapter();
    const service = new LearningMaterialService(user.accessToken);

    // When a page isn't selected.
    if (!selectedMaterialPage) return;

    // When a material is selected but it has no ID.
    // This is an error.
    if (!selectedMaterialPage.id) {
      onChangeRequestState({
        status: "erred",
        message: strings.DEFAULT_ERROR_MESSAGE,
      });
      return;
    }

    // Notice the type coercion.
    service.getPageContent<{ data: RawLearningMaterialPageContent }>({
      id: selectedMaterialPage.id,
      onSuccess: ({ data }) => onSuccess(adapter.deserialize(data)),
      onFailure: (message) =>
        onChangeRequestState({ message, status: "erred" }),
    });
  }, [selectedMaterialPage, ...additionalDeps]);
}
