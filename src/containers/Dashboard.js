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
import { useHistory, useParams } from "react-router-dom";
import { apiService, createPage, deletePage } from "../service";

// Static.
import "./Home.css";
import "../assets/index.css";
import { toast } from "react-toastify";
import { updatePageMeta } from "../service";

function Dashboard() {
  const history = useHistory();
  const { id, page = 1 } = useParams();
  const { user_type } = JSON.parse(localStorage.getItem("user"));
  const [{ pages, state, number_of_pages }, setState] = React.useState({
    pages: [],
    state: "loading",
    number_of_pages: 1,
  });

  React.useEffect(() => {
    // console.log(document.getElementById("divSnippetHandle"));

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

        /**
         * A unique scenario.
         *
         * --------------------------------------------------------------------
         * The user hasn't created a page yet, which we know due to the missing
         * data, but there needs to be a page. So we create one for them.
         *
         * Note that this is valid only if the requested page is numbered as 1,
         * which is the also the fallback when no page number is requested.
         * --------------------------------------------------------------------
         */
        if (page == 1) {
          // Time to create a new page.
          onCreatePage({
            waitWithTimeout: false,
            event: { preventDefault: () => {} },
            data: {
              content_id: id,
              title: "Default title",
              description: "Default description",
              thumbnail: null,
            },
          });
          return;
        }

        //! Neither some data is found nor the 1st page is requested.
        history.push("/error/404");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  /**
   * Create a new page for the current material.
   *
   * @param {Object} props
   *
   * @param {Event} props.event An event to be prevented from happening.
   *
   * @param {Object} props.data The data to create a new page with.
   *
   * @param {import("react-toastify").Id | undefined} props.burger
   * The toast to be updated, a newer is created otherwise.
   *
   * @param {boolean} props.waitWithTimeout Default = true;
   * Whether to wait, while a sweet little toast is displayed, before
   * redirecting towards the newly created page or instantly hustle.
   */
  function onCreatePage({ event, data, burger, waitWithTimeout = true }) {
    event.preventDefault();

    createPage({
      data,
      onSuccess: (newPages, newBurger) => {
        // Inform the ongoing operation.
        toast.update(newBurger, {
          isLoading: false,
          type: toast.TYPE.INFO,
          autoClose: config.integers.REDIRECTION,
          render: "Added, redirecting you to the new page.",
        });

        const nextUrl = `/${id}/page/${newPages.length}`;

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
          window.location.replace(`/${id}`);
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
