/* eslint-disable eqeqeq */
import type {
  LearningMaterialPage,
  RawLearningMaterialPage,
} from "../Entities/LearningMaterialPageEntity";

export default class LearningMaterialPageAdapter {
  serialize(state: LearningMaterialPage): RawLearningMaterialPage {
    return {
      title: state.title || "",
      description: state.description || "",
      content_id: state.materialID,
      thumbnail: state.thumbnail || "",
      // Optional props
      ...(state.id !== undefined && { id: state.id }),
      ...(state.thumbnail !== undefined && { thumbnail: state.thumbnail }),
    };
  }

  deserialize(state: RawLearningMaterialPage): LearningMaterialPage {
    return {
      ...(state.id !== undefined && { id: state.id }),
      title: state.title || "",
      materialID: state.content_id,
      description: state.description || "",
      thumbnail: state.thumbnail || "",
    };
  }
}
