import { LearningMaterial } from "@Data/Entities/LearningMaterialEntity";

export function getEditorRoute({
  id,
  slug,
  page = 1,
}: {
  id: LearningMaterial["id"];
  slug: LearningMaterial["slug"];
  page?: number;
}) {
  return `/editor/${id}/${slug}/page/${page}`;
}
