import type { LearningMaterialPage } from "../../../../Data/Entities/LearningMaterialPageEntity";

export type ViewerState = {
  materialPages: LearningMaterialPage[];
  selectedMaterialPage?: LearningMaterialPage;
};
