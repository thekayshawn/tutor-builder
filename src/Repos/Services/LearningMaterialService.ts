import { apiService } from "../../service";
import { Boolbacks } from "../../Data/Types";
import { API_MAIN_URL } from "../../config";
import { getAuthHeaders } from "../../utils";

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
      url: `${API_MAIN_URL}/contentbuilder/learning-material/fetch-pages/${id}`,
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
      url: `${API_MAIN_URL}/api/learning-material/fetch-page-content/${id}`,
    });
  }
}
