import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

export type EditorState = {
  currentPage: number;
  materialPages: LearningMaterialPage[];
  selectedMaterialPage?: LearningMaterialPage;
};
