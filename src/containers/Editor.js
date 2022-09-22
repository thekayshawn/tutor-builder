import * as React from "react";

// Utils.
import { apiService } from "../service";
import { getAuthHeaders } from "../utils";
import { URL_USER_SERVICE } from "../env";
import { useParams } from "react-router-dom";

/**
 * @param {Object} props
 *
 * @param {{
 * id: number,
 * content_id: number,
 * title: string,
 * description: string,
 * thumbnail: string | undefined
 * }[]} props.data
 *
 * @property {string} token
 *
 * @returns {JSX.Element}
 */
function Editor({ data, token }) {
  const { page = 1 } = useParams();
  const pageData = data[page - 1];
  console.log({ page, data, pageData });

  const [{ _id, page_id, content_id, questions, html }, setState] =
    React.useState({
      _id: null,
      page_id: null,
      content_id: null,
      questions: [],
      html: "",
    });

  React.useEffect(() => {
    // No page to fetch data for.
    if (!data.length) return;

    // Request the content of the current page..
    apiService.get({
      headers: getAuthHeaders(token),
      url: `${URL_USER_SERVICE}/api/learning-material/fetch-page-content/${pageData.id}`,
      onSuccess: ({ data }) => setState(data),
      onFailure: (error) => console.error(error),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return <div>Editor</div>;
}

export default Editor;
