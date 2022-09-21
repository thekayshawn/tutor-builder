// Components.
import Edit from "./Edit";
import { Link } from "react-router-dom";
import Courses from "./CoursesAvailble";

// Utils.
import { logout } from "../utils";

// Static.
import "./Home.css";

function Dashboard() {
  const { user_type } = JSON.parse(localStorage.getItem("user"));

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
      {user_type === "tutor" ? <Edit /> : <Courses />}
    </div>
  );
}
export default Dashboard;
