import { Boolbacks } from "@Data/Types";
import { apiService } from "../../service";
import { URL_USER_SERVICE } from "@Core/env";
import { User } from "@Data/Entities/UserEntity";
import { getAuthHeaders, getFormDataFromObject } from "@Core/Helpers/utils";
import { RawLearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";
import { RawLearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";

export default class LearningMaterialService {
  token: User["accessToken"];

  constructor(token: User["accessToken"]) {
    this.token = token;
  }

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
      headers: getAuthHeaders(this.token),
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
      headers: getAuthHeaders(this.token),
      url: `${URL_USER_SERVICE}/api/learning-material/fetch-page-content/${id}`,
    });
  }

  /* ---------------------------------------------------------------------------
   * Post Queries.
   * ------------------------------------------------------------------------ */
  /**
   * Saves a page's content on the server.
   *
   * @return {void}
   */
  savePageContent({
    html,
    page_id,
    content_id,
    onSuccess,
    onFailure,
  }: RawLearningMaterialPageContent & Boolbacks<unknown>): void {
    apiService.post({
      onSuccess,
      headers: getAuthHeaders(this.token),
      data: getFormDataFromObject({
        html,
        page_id: page_id.toString(),
        content_id: content_id.toString(),
      }),
      url: `${URL_USER_SERVICE}/api/learning-material/update`,
      onFailure: ({ message }) =>
        onFailure(message || "There was an error, please try again"),
    });
  }

  /**
   * Adds a new page in the list of materials on the server.
   *
   * @return {void}
   */
  addNewPage({
    rawPage,
    onSuccess,
    onFailure,
  }: {
    rawPage: RawLearningMaterialPage;
  } & Boolbacks<RawLearningMaterialPage>): void {
    apiService.post({
      onSuccess,
      onFailure,
      headers: getAuthHeaders(this.token),
      data: getFormDataFromObject(rawPage),
      url: `${URL_USER_SERVICE}/contentbuilder/learning-material/add-page`,
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
