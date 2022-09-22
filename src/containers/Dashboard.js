/* eslint-disable eqeqeq */
import * as React from "react";

// Components.
import Editor from "./Editor";
import Courses from "./CoursesAvailble";
import Loader from "../components/loader";
import { Error500 } from "../components/error";

// Utils.
import { apiService, deletePage } from "../service";
import { getAuthHeaders } from "../utils";
import { URL_USER_SERVICE } from "../env";
import { useHistory, useParams } from "react-router-dom";

// Static.
import "./Home.css";
import { toast } from "react-toastify";

function Dashboard() {
  const { id } = useParams();
  const history = useHistory();
  const { user_type } = JSON.parse(localStorage.getItem("user"));
  const [{ data, state }, setState] = React.useState({
    data: [],
    state: "loading",
  });

  React.useEffect(() => {
    // Request the metadata for the current set of learning materials.
    apiService.get({
      headers: getAuthHeaders(),
      url: `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id}?order=ASC`,
      onSuccess: ({ data }) => setState({ data, state: "loaded" }),
      onFailure: () => setState({ state: "erred" }),
    });
  }, [id]);

  /**
   * Updates the list of pages while removing the page with the specified id.
   * Moreover, navigates the user to the new first page of the list.
   * @param {number} page_id
   */
  function onDeletePageListener(page_id) {
    // There's just one page.
    if (data.length <= 1) {
      toast.info("This is the only page so far, no point in deleting it.");
      return;
    }

    deletePage({
      page_id,
      onSuccess: () => {
        setState((lastState) => ({
          ...lastState,
          data: data.filter((page) => page_id == page.page_id),
        }));

        // Not passing a page results in the first page being displayed.
        history.push(`/${id}`);
      },
    });
  }

  return (
    <div>
      {/* <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ display: "none" }}
      >
        <div className="container">
          <a className="navbar-brand-tutor" href="/">
            <img
              src="assets/minimalist-blocks/preview/Navigation.png"
              alt="learner-img"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li>
                <Link className="dropdown-item" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      {user_type === "tutor" ? (
        state === "erred" ? (
          <Error500 />
        ) : state === "loading" ? (
          <Loader />
        ) : data ? (
          <Editor {...{ data, onDeletePageListener }} />
        ) : (
          <Error500 />
        )
      ) : (
        <Courses />
      )}
    </div>
  );
}
export default Dashboard;
