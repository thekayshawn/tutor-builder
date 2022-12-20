import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

export type EditorState = {
  currentPage: number;
  materialPages: LearningMaterialPage[];
  selectedMaterialPage?: LearningMaterialPage;
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
} & EditorState;
