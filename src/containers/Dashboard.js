import * as React from "react";

// Components.
import Editor from "./Editor";
import Courses from "./CoursesAvailble";
import Loader from "../components/loader";
import { Error500 } from "../components/error";

// Utils.
import { apiService } from "../service";
import { getAuthHeaders } from "../utils";
import { URL_USER_SERVICE } from "../env";
import { useParams } from "react-router-dom";

// Static.
import "./Home.css";

function Dashboard() {
  const { id } = useParams();
  const { user_type, access_token } = JSON.parse(localStorage.getItem("user"));
  const [{ data, state }, setState] = React.useState({
    data: [],
    state: "loading",
  });

  React.useEffect(() => {
    // Request the metadata for the current set of learning materials.
    apiService.get({
      headers: getAuthHeaders(access_token),
      url: `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id}?order=ASC`,
      onSuccess: ({ data }) => setState({ data, state: "loaded" }),
      onFailure: () => setState({ state: "erred" }),
    });
  }, [id, access_token]);

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
          <Editor data={data} token={access_token} />
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
