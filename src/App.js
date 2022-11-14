import React from "react";
import Routes from "./Routes";
import { apiService } from "./service";
import Loader from "./components/loader";
import { API_MAIN_URL } from "./config";
import { useLocation } from "react-router-dom";
import { getAuthHeaders, isObjectValid } from "./utils";
import { Error403, Error500 } from "./components/error";

// Static.
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Error440 from "./components/error/error-440";

function App() {
  const [state, setState] = React.useState("loading");

  // Either the stored user or nothing.
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { search } = useLocation();

  // Either the token from URL or the stored one.
  const token =
    React.useMemo(() => new URLSearchParams(search), [search]).get("token") ||
    localStorage.getItem("token");

  React.useEffect(() => {
    // A token is provided for a new session.
    if (token) {
      apiService.post({
        headers: getAuthHeaders(token),
        url: `${API_MAIN_URL}/validate-token`,
        onFailure: ({ error }) => {
          // Token expired.
          if (error.status === 440) {
            setState("expired");
            return;
          }

          // Some other error.
          setState("erred");
        },
        onSuccess: ({ data }) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...data.data,
              access_token: token,
              isAuthenticated: true,
            })
          );
          setState("authenticated");
        },
      });

      return;
    }

    // A previous session exists.
    if (isObjectValid(user)) {
      setState("authenticated");
      return;
    }

    // Neither a token is provided nor a previous session is saved.
    if (!token && !isObjectValid(user)) {
      setState("unauthenticated");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  return (
    <>
      <ToastContainer />
      {{
        erred: <Error500 />,
        loading: <Loader />,
        expired: <Error440 />,
        authenticated: <Routes />,
        unauthenticated: <Error403 />,
      }[state] || <Error500 />}
    </>
  );
}

export default App;
