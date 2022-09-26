import { toast } from "react-toastify";
import apiService from "../service-api";
import { URL_USER_SERVICE } from "../../env";
import { getAuthHeaders, getFormDataFromObject } from "../../utils";

/**
 * Update a page's content using the API.
 * @param {Object} props
 * @param {string} props.html
 * @param {number} props.page_id
 * @param {number} props.content_id
 */
function updatePageContent({
  html,
  page_id,
  content_id,
  onSuccess,
  onFailure,
}) {
  if (!page_id || !content_id) {
    toast.error("Internal server error! Please try again.");
    console.error(
      `Missing 'page_id' or 'content_id' parameter in ${updatePageContent.name} function!`
    );
    return;
  }

  const burger = toast("Saving...", {
    isLoading: true,
  });

  apiService.post({
    headers: getAuthHeaders(),
    data: getFormDataFromObject({ html, page_id, content_id }),
    url: `${URL_USER_SERVICE}/api/learning-material/update`,
    onSuccess: ({ data }) => {
      toast.update(burger, {
        autoClose: true,
        isLoading: false,
        type: toast.TYPE.SUCCESS,
        render: "Page saved successfully.",
      });
      onSuccess?.(data, burger);
    },
    onFailure: ({ message }) => {
      toast.update(burger, {
        autoClose: true,
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

export default updatePageContent;
