/**
 * Learning material page content used throughout the app. Generated after the
 * raw-er sibling goes through a whole ass adapter.
 */
export interface LearningMaterialPageContent {
  /**
   * The reference ID of the content. Different from generic tabular ID.
   */
  id: string;

  /**
   * ID of the page this content belongs to.
   */
  pageID: number;

  /**
   * ID of the material this content's page belongs to.
   */
  materialID: number;

  /**
   * The main content for which all the effort is for.
   */
  htmlMarkup: string;
}

/**
 * Retrived from the API (hopefully).
 */
export interface RawLearningMaterialPageContent {
  _id: string;
  html: string;
  page_id: number;
  content_id: number;
}
