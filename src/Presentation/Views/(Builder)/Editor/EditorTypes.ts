import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

export type EditorState = {
  slug: string;
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

// Header.
export type EditorHeaderState = {
  /**
   * The total number of pages added so far.
   */
  numOfPages: number;

  /**
   * Event listener for the add button's click event.
   */
  onClickAdd: () => void;

  /**
   * Event listener for the remove button's click event.
   */
  onClickRemove: () => void;

  /**
   * Event listener for the save button's click event.
   */
  onClickSave: () => void;

  /**
   * Event listener for the save & continue button's click event.
   */
  onClickSaveAndContinue: () => void;
} & React.ComponentPropsWithoutRef<"div">;
