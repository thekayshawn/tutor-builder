import { toast } from "react-toastify";
import apiService from "../service-api";
import { URL_USER_SERVICE } from "../../env";
import { getAuthHeaders, getFormDataFromObject } from "../../utils";

/**
 * Create a new page using the API.
 * @param {Object} props
 * @param {{
 * content_id: number,
 * title: string,
 * description: string,
 * thumbnail: File,
 * }} props.data
 */
function createPage({ data, onSuccess, onFailure }) {
  if (!data) {
    toast.error("Internal server error! Please try again.");
    console.error(`Missing or corrupted data in ${createPage.name} function!`);
    return;
  }

  const burger = toast("Saving...", {
    isLoading: true,
  });

  apiService.post({
    headers: getAuthHeaders(),
    data: getFormDataFromObject(data),
    url: `${URL_USER_SERVICE}/contentbuilder/learning-material/add-page`,
    onSuccess: ({ data }) => onSuccess?.(data, burger),
    onFailure: ({ message }) => {
      toast.update(burger, {
        autoClose: true,
        isLoading: false,
        type: toast.TYPE.ERROR,
        render: message || "Unable to add right now, please try again!",
      });
      onFailure?.(
        message || "Unable to add right now, please try again!",
        burger
      );
    },
  });
}

export default createPage;
