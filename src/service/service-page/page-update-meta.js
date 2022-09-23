import { toast } from "react-toastify";
import apiService from "../service-api";
import { URL_USER_SERVICE } from "../../env";
import { getAuthHeaders, getFormDataFromObject } from "../../utils";

/**
 * Update a page's metadata using the API.
 * @param {Object} props
 * @param {{
 * page_id: number,
 * content_id: number,
 * title: string,
 * description: string,
 * thumbnail: File,
 * }} props.data
 */
function updatePageMeta({ data, onSuccess, onFailure }) {
  if (!data) {
    toast.error("Internal server error! Please try again.");
    console.error(
      `Missing or corrupted payload in ${updatePageMeta.name} function!`
    );
    return;
  }

  const burger = toast("Updating...", {
    isLoading: true,
  });

  apiService.post({
    headers: getAuthHeaders(),
    data: getFormDataFromObject(data),
    url: `${URL_USER_SERVICE}/contentbuilder/learning-material/update-page`,
    onSuccess: ({ data }) => {
      toast.update(burger, {
        autoClose: true,
        isLoading: false,
        type: toast.TYPE.SUCCESS,
        render: "Page updated successfully.",
      });
      onSuccess?.(data, burger);
    },
    onFailure: ({ message }) => {
      toast.update(burger, {
        autoClose: true,
        isLoading: false,
        type: toast.TYPE.ERROR,
        render: message || "Unable to update right now, please try again!",
      });
      onFailure?.(
        message || "Unable to update right now, please try again!",
        burger
      );
    },
  });
}

export default updatePageMeta;
