import { apiService } from "../../service";
import { Boolbacks } from "../../Data/Types";
import { getAuthHeaders } from "../../utils";
import { URL_USER_SERVICE } from "@Core/env";

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
}
