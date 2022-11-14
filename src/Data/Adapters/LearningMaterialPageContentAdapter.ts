/* eslint-disable eqeqeq */
import type {
  LearningMaterialPageContent,
  RawLearningMaterialPageContent,
} from "../Entities/LearningMaterialPageContentEntity";

export default class LearningMaterialPageContentAdapter {
  serialize(
    state: LearningMaterialPageContent
  ): RawLearningMaterialPageContent {
    return {
      _id: state.id,
      page_id: state.pageID,
      html: state.htmlMarkup || "",
      content_id: state.materialID,
    };
  }

  deserialize(
    state: RawLearningMaterialPageContent
  ): LearningMaterialPageContent {
    return {
      id: state._id,
      pageID: state.page_id,
      materialID: state.content_id,
      htmlMarkup: state.html || "",
    };
  }
}
