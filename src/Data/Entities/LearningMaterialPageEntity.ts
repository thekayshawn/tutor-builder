/**
 * Learning material page used throughout the app. Generated after the raw-er
 * sibling goes through a whole ass adapter.
 */
export interface LearningMaterialPage {
  id?: number;
  title: string;
  description: string;

  /**
   * ID of the learning material this page belongs to.
   */
  materialID: number;

  /**
   * URL of the page's thumbnail.
   */
  thumbnail: string;
}

export interface RawLearningMaterialPage {
  id?: number;
  title: string;
  description: string;
  content_id: number;
  thumbnail?: string;
}
