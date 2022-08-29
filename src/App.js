import React from "react";
import Routes from "./Routes";
import { apiService } from "./service";
import Loader from "./components/loader";
import { USER_SERVICE_URL } from "./config";
import { useLocation } from "react-router-dom";
import { getAuthHeaders, isObjectValid } from "./utils";
import { Error403, Error500 } from "./components/error";

function App() {
  const [state, setState] = React.useState("loading");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { search } = useLocation();
  const token =
    React.useMemo(() => new URLSearchParams(search), [search]).get("token") ||
    localStorage.getItem("token");

  React.useEffect(() => {
    // Neither a token is provided nor a previous session is saved.
    if (!token && !isObjectValid(user)) {
      setState("unauthenticated");
      return;
    }

    // A token is provided for a new session.
    if (token) {
      apiService.post({
        headers: getAuthHeaders(token),
        url: `${USER_SERVICE_URL}/validate-token`,
        onFailure: () => setState("erred"),
        onSuccess: (data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...data.data.data,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  return (
    {
      erred: <Error500 />,
      loading: <Loader />,
      authenticated: <Routes />,
      unauthenticated: <Error403 />,
    }[state] || <Error500 />
  );
}

export default App;
