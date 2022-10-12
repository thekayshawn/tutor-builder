/* eslint-disable eqeqeq */
import * as React from "react";

// Components.
import Editor from "./Editor";
import Courses from "./CoursesAvailble";
import Loader from "../components/loader";
import { Error500 } from "../components/error";

// Utils.
import config from "../config";
import { getAuthHeaders } from "../utils";
import { URL_USER_SERVICE } from "../env";
import { useParams } from "react-router-dom";
import { apiService, createPage, deletePage } from "../service";

// Static.
import "./Home.css";
import { toast } from "react-toastify";
import { updatePageMeta } from "../service";

function Dashboard() {
  const { id, page = 1 } = useParams();
  const { user_type } = JSON.parse(localStorage.getItem("user"));
  const [{ pages, state, number_of_pages }, setState] = React.useState({
    pages: [],
    state: "loading",
    number_of_pages: 1,
  });

  // The current action type, can be edit or add.
  const currentAction = window.location.pathname.split("/")[1];

  React.useEffect(() => {
    // Request the current page's metadata.
    apiService.get({
      headers: getAuthHeaders(),
      url: `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id}?page=${page}&limit=1&order=ASC`,
      onFailure: () => setState({ state: "erred" }),
      onSuccess: ({ data, number_of_pages }) => {
        // No exception.
        if (!data) {
          setState({ pages, number_of_pages, state: "erred" });
          return;
        }

        // Phew.
        if (data.length > 0) {
          setState({ pages: data, state: "loaded", number_of_pages });
          return;
        }

        // Time to create a new page.
        onCreatePage(
          { preventDefault: () => {} },
          {
            content_id: id,
            title: "This page is missing a title.",
            description: "This page is missing a description.",
            thumbnail: null,
          },
          false
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  function onCreatePage(e, page, waitWithTimeout = true) {
    e.preventDefault();

    createPage({
      data: page,
      onSuccess: (newPages, burger) => {
        setState((lastState) => ({
          ...lastState,
          pages: newPages,
        }));

        // Inform the ongoing operation.
        toast.update(burger, {
          isLoading: false,
          type: toast.TYPE.INFO,
          autoClose: config.integers.REDIRECTION,
          render: "Added, redirecting you to the new page.",
        });

        const nextUrl = `/${currentAction}/${id}/page/${newPages.length}`;

        !waitWithTimeout
          ? window.location.replace(nextUrl)
          : // Mock a redirection mechanism for better UX.
            setTimeout(() => {
              // Redirect.
              // The content builder, due to JQuery or whatever, doesn't handle a restart and parts of it don't even get re-rendered correctly. So we have to perform a hard reload in order for it to work.
              window.location.replace(nextUrl);
            }, config.integers.REDIRECTION);
      },
    });
  }

  /**
   * Updates the list of pages while removing the page with the specified id.
   * Moreover, navigates the user to the new first page of the list.
   * @param {number} page_id
   */
  function onDeletePage(page_id) {
    // There's just one page.
    if (number_of_pages == 1) {
      toast.info("This is the only page so far, no point in deleting it.");
      return;
    }

    deletePage({
      page_id,
      onSuccess: (_, burger) => {
        setState((lastState) => ({
          ...lastState,
          pages: lastState.pages.filter((page) => page_id == page.id),
        }));

        // Inform the ongoing operation.
        toast.update(burger, {
          isLoading: false,
          type: toast.TYPE.INFO,
          autoClose: config.integers.REDIRECTION,
          render: "Deleted, redirecting you to the first page.",
        });

        // Mock a redirection mechanism for better UX.
        setTimeout(() => {
          // Not passing a page results in the first page being displayed.
          // The method above this has an explanation for the hard reload performed in these handlers.
          window.location.replace(`/${currentAction}/${id}`);
        }, config.integers.REDIRECTION);
      },
    });
  }

  function onUpdatePageMeta(e, meta) {
    e.preventDefault();

    updatePageMeta({
      data: meta,
    });
  }

  return user_type === "tutor" ? (
    state === "erred" ? (
      <Error500 />
    ) : state === "loading" ? (
      <Loader />
    ) : state === "loaded" && pages && Array.isArray(pages) ? (
      <Editor
        data={pages}
        {...{
          page,
          onDeletePage,
          onCreatePage,
          currentAction,
          onUpdatePageMeta,
          number_of_pages,
        }}
      />
    ) : (
      <Error500 />
    )
  ) : (
    <Courses />
  );
}
export default Dashboard;
