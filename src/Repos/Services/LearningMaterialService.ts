import { apiService } from "../../service";
import { getAuthHeaders, getFormDataFromObject } from "../../utils";
import { URL_USER_SERVICE } from "@Core/env";
import type { Boolbacks } from "../../Data/Types";

// type UpdateProgressService = {
//   // The learning material's ID.
//   id: number;

//   // ID of the page that's receiving a progress update.
//   entityID: number;

//   onSuccess: Boolbacks<any>["onSuccess"];
//   onFailure: Boolbacks<any>["onFailure"];
// };

export default class LearningMaterialService {
  /**
   * Fetch a material's pages.
   */
  getPages<T>({
    id,
    onSuccess,
    onFailure,
  }: Boolbacks<T> & {
    id: number;
  }) {
    apiService.get({
      onSuccess,
      onFailure,
      data: undefined,
      headers: getAuthHeaders(undefined),
      url: `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id}`,
    });
  }

  /**
   * Fetch a material's page's content.
   */
  getPageContent<T>({
    id,
    onSuccess,
    onFailure,
  }: Boolbacks<T> & {
    id: number;
  }) {
    apiService.get({
      onSuccess,
      onFailure,
      data: undefined,
      headers: getAuthHeaders(undefined),
      url: `${URL_USER_SERVICE}/api/learning-material/fetch-page-content/${id}`,
    });
  }

  /**
   * Update the progress of a learning material of type pages.
   *
   * @author kashan-ahmad
   * @version 0.0.1
   */
  // updateProgress({
  //   id,
  //   entityID,
  //   onSuccess,
  //   onFailure,
  // }: UpdateProgressService) {
  //   apiService.post({
  //     onSuccess,
  //     onFailure,
  //     headers: getAuthHeaders(undefined),
  //     data: getFormDataFromObject({
  //       lm_id: id,
  //       file_id: 0,
  //       page_id: entityID,
  //     }),
  //     url: `${URL_USER_SERVICE}/contentbuilder/learning-material/completion-progress`,
  //   });
  // }
}
