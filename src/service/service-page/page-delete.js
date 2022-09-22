import { toast } from "react-toastify";
import apiService from "../service-api";
import { URL_USER_SERVICE } from "../../env";
import { getAuthHeaders } from "../../utils";

/**
 * Delete a page from the database.
 * @param {Object} props
 * @param {number} props.page_id
 */
function deletePage({ page_id, onSuccess, onFailure }) {
  if (!page_id) {
    toast.error("Internal server error! Please try again.");
    console.error(
      `Missing 'page_id' parameter in ${deletePage.name} function!`
    );
    return;
  }

  const burger = toast("Deleting...", {
    isLoading: true,
  });

  apiService.delete({
    recordId: page_id,
    headers: getAuthHeaders(),
    url: `${URL_USER_SERVICE}/contentbuilder/learning-material/delete-page`,
    onSuccess: ({ data }) => {
      toast.update(burger, {
        isLoading: false,
        type: toast.TYPE.SUCCESS,
        render: "Page reduced to atoms.",
      });
      onSuccess?.(data, burger);
    },
    onFailure: ({ message }) => {
      toast.update(burger, {
        isLoading: false,
        type: toast.TYPE.ERROR,
        render:
          message || "It's a sturdy one, won't get deleted, please try again!",
      });
      onFailure?.(
        message || "It's a sturdy one, won't get deleted, please try again!",
        burger
      );
    },
  });
}

export default deletePage;
