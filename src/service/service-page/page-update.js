import { toast } from "react-toastify";
import apiService from "../service-api";
import { URL_USER_SERVICE } from "../../env";
import { getAuthHeaders, getFormDataFromObject } from "../../utils";

/**
 * Update a page in the API.
 * @param {Object} props
 * @param {number} props.page_id
 * @param {string} props.html
 */
function updatePage({ page_id, html, onSuccess, onFailure }) {
  if (!page_id) {
    toast.error("Internal server error! Please try again.");
    console.error(
      `Missing 'page_id' parameter in ${updatePage.name} function!`
    );
    return;
  }

  const burger = toast("Saving...", {
    isLoading: true,
  });

  apiService.post({
    headers: getAuthHeaders(),
    data: getFormDataFromObject({ page_id, html }),
    url: `${URL_USER_SERVICE}/api/learning-material/update`,
    onSuccess: ({ data }) => {
      toast.update(burger, {
        isLoading: false,
        type: toast.TYPE.SUCCESS,
        render: "Page saved successfully.",
      });
      onSuccess?.(data, burger);
    },
    onFailure: ({ message }) => {
      toast.update(burger, {
        isLoading: false,
        type: toast.TYPE.ERROR,
        render: message || "Unable to save right now, please try again!",
      });
      onFailure?.(
        message || "Unable to save right now, please try again!",
        burger
      );
    },
  });
}

export default updatePage;
