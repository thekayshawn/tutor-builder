import * as React from "react";
import useUser from "@Core/Hooks/useUser";
import { messages } from "@Core/Helpers/strings";
import betterToast from "@Core/Helpers/betterToast";
import LearningMaterialService from "@Repos/Services/LearningMaterialService";
import LearningMaterialPageAdapter from "@Data/Adapters/LearningMaterialPageAdapter";
import LearningMaterialPageContentAdapter from "@Data/Adapters/LearningMaterialPageContentAdapter";

// Types.
import type { EditorHandlers, EditorState } from "./EditorTypes";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";
import type { LearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";

type Props = {
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
};

/**
 * Hook into the handlers of the editor.
 *
 * @returns {EditorHandlers}
 */
export default function useEditorHandlers({
  state,
  setState,
}: Props): EditorHandlers {
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

    service.addNewPage({
      rawPage: pageAdapter.serialize(page),
      onFailure: (message) => betterToast.error({ message }),
      onSuccess: ({ data }) => {
        const pages = data.map((rawPage) =>
          // Notice the original type.
          pageAdapter.deserialize(rawPage)
        );

        setState({
          ...state,
          materialPages: pages,
          selectedMaterialPage: pages[pages.length - 1],
        });

        betterToast.success({ message: messages.ADDED });
      },
    });
  }

  function handlePageSave(pageContent: LearningMaterialPageContent) {
    betterToast.loading();

    service.savePageContent({
      ...pageContentAdapter.serialize(pageContent),
      onFailure: (message) => betterToast.error({ message }),
      onSuccess: () => betterToast.success({ message: messages.SAVED }),
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
