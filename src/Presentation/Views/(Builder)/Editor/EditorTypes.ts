import * as React from "react";
import BuilderControl from "src/components/contentbuilder/buildercontrol";

// Types.
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";
import type { LearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";

export type EditorState = {
  materialPages: LearningMaterialPage[];
  selectedMaterialPage?: LearningMaterialPage;
};

export type EditorHelpers = {
  currentSlug: string;
  currentPage: number;
  ref: {
    editor: React.RefObject<BuilderControl>;
    pageContent?: LearningMaterialPageContent;
  };
};

export type EditorHandlers = {
  handlePageAdd: (page: LearningMaterialPage) => unknown;
  handlePageSave: (pageContent: LearningMaterialPageContent) => unknown;
  handlePageRemove: () => unknown;
  handlePageSaveAndContinue: () => unknown;
};

export type EditorBag = {
  state: EditorState;
  helpers: EditorHelpers;
  handlers: EditorHandlers;
};

// Footer.
export type EditorFooterState = {
  /**
   * Listener to request fullscreen.
   *
   * @returns {void}
   */
  onRequestFullscreen: () => void;

  /**
   * Listener to change the page using the pagination component.
   *
   * @param {number} newPage
   * The page number to load.
   *
   * @returns {void}
   */
  onChangePage: (newPage: number) => void;
};

// Header.
export type EditorHeaderState = {
  /**
   * Event listener for the add button's click event.
   */
  onClickAdd: () => unknown;

  /**
   * Event listener for the save button's click event.
   */
  onClickSave: () => unknown;

  /**
   * Event listener for the remove button's click event.
   */
  onClickRemove: () => unknown;

  /**
   * Event listener for the save & continue button's click event.
   */
  onClickSaveAndContinue: () => unknown;
} & React.ComponentPropsWithoutRef<"div">;

// Interface.
export type EditorInterfaceState = {
  pageContent?: LearningMaterialPageContent;
};
