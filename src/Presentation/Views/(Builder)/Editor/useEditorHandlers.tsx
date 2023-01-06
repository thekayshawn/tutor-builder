import useUser from "@Core/Hooks/useUser";
import strings from "@Core/Helpers/strings";
import betterToast from "@Core/Helpers/betterToast";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageAdapter from "@Data/Adapters/LearningMaterialPageAdapter";
import LearningMaterialPageContentAdapter from "@Data/Adapters/LearningMaterialPageContentAdapter";

// Types.
import type { EditorHandlers, EditorState } from "./EditorTypes";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";
import type { LearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";

/**
 * Hook into the handlers of the editor.
 *
 * @returns {EditorHandlers}
 */
export default function useEditorHandlers(): EditorHandlers {
  const user = useUser();

  // Services.
  const pageAdapter = new LearningMaterialPageAdapter();
  const service = new LearningMaterialService(user.accessToken);
  const pageContentAdapter = new LearningMaterialPageContentAdapter();

  // Handlers.
  /**
   * Adds a new page to the learning material pages list.
   */
  function handlePageAdd(page: LearningMaterialPage) {
    betterToast.loading();

    // TODO: Update state with the new list of pages.
    // service.addNewPage({
    //   rawPage: pageAdapter.serialize(page),
    //   onSuccess: (data) => {
    //     setState({..., materialPages: data})
    //     betterToast.success({ message: strings.SAVED })
    //   }
    // })
  }

  function handlePageSave(pageContent: LearningMaterialPageContent) {
    betterToast.loading();

    service.savePageContent({
      ...pageContentAdapter.serialize(pageContent),
      onFailure: (message) => betterToast.error({ message }),
      onSuccess: () => betterToast.success({ message: strings.SAVED }),
    });
  }

  function handlePageRemove() {}

  function handlePageSaveAndContinue() {}

  return {
    handlePageAdd,
    handlePageSave,
    handlePageRemove,
    handlePageSaveAndContinue,
  };
}
