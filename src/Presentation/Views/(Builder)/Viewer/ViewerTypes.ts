import type { LearningMaterial } from "../../../../Data/Entities/LearningMaterialEntity";

export type ViewerState = {
  materialPages: LearningMaterial[];
  selectedMaterialPage?: LearningMaterial;
};
