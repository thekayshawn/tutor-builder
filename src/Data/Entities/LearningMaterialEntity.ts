export type LearningMaterialContentType = 0 | 1 | 2;

/**
 * Learning materials come in 3 content types.
 */
export const materialContentType: Record<string, LearningMaterialContentType> =
  {
    FILES: 0,
    PAGES: 1,
    AMBIGUOUS: 2,
  };

/**
 * Learning material used throughout the app. Generated after the raw-er sibling
 * goes through an adapter.
 */
export interface LearningMaterial {
  id?: number;

  title: string;

  description: string;

  /**
   * Whether the material has a quiz with it or not.
   */
  hasQuiz: boolean;

  /**
   * Whether the material has an answer key with it or not.
   */
  hasAnswerKey: boolean;

  /**
   * Whether the material uses copywritten content or not.
   */
  hasCopyright: boolean;

  /**
   * URL of the material's thumbnail.
   */
  thumbnail?: string;

  /**
   * URL of the material's preview/cover.
   */
  preview?: string;

  /**
   * Whether the material has been published or not.
   */
  isPublished: boolean;

  /**
   * The type of content presented by the learning material..
   */
  contentType: LearningMaterialContentType;

  slug: string;

  /**
   * Number of sales so far.
   */
  numOfPlacedOrders: number;

  /**
   * Final cost.
   */
  price: number;

  /**
   * Percentage discount applied.
   */
  discount: number;

  /**
   * How much of it has the buyer utilized.
   */
  completionPercentage: number;
}

/**
 * The learning material retrived from the API (hopefully).
 */
export interface RawLearningMaterial {
  id?: number;
  title: string;
  description: string;
  quiz_or_questions: 1 | 0;
  answers_key: 1 | 0;
  copyright: 1 | 0;
  product_thumbnail: string;
  product_preview: string;
  published: 1 | 0;
  content_type: LearningMaterialContentType;
  slug: string;
  lmorders_count: number;
  price: number;
  discount: number;
  completed_percentage: number;
}
