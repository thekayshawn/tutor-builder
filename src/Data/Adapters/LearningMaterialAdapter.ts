/* eslint-disable eqeqeq */
import type {
  LearningMaterial,
  RawLearningMaterial,
} from "../Entities/LearningMaterialEntity";

export default class LearningMaterialAdapter {
  serialize(state: LearningMaterial): RawLearningMaterial {
    return {
      ...(state.id !== undefined && { id: state.id }),
      title: state.title || "",
      description: state.description || "",
      quiz_or_questions: state.hasQuiz ? 1 : 0,
      answers_key: state.hasAnswerKey ? 1 : 0,
      copyright: state.hasCopyright ? 1 : 0,
      product_thumbnail: state.thumbnail || "",
      product_preview: state.preview || "",
      published: state.isPublished ? 1 : 0,
      content_type: state.contentType ?? 2,
      slug: state.slug || "",
      lmorders_count: state.numOfPlacedOrders || 0,
      price: state.price || 0,
      discount: state.discount || 0,
      completed_percentage: state.completionPercentage || 0,
    };
  }

  deserialize(state: RawLearningMaterial): LearningMaterial {
    return {
      ...(state.id !== undefined && { id: state.id }),
      title: state.title || "",
      description: state.description || "",
      hasQuiz: state.quiz_or_questions == 1,
      hasAnswerKey: state.answers_key == 1,
      hasCopyright: state.copyright == 1,
      thumbnail: state.product_thumbnail || "",
      preview: state.product_preview || "",
      isPublished: state.published == 1,
      contentType: state.content_type ?? 2,
      slug: state.slug || "",
      numOfPlacedOrders: state.lmorders_count || 0,
      price: state.price || 0,
      discount: state.discount || 0,
      completionPercentage: state.completed_percentage || 0,
    };
  }
}
