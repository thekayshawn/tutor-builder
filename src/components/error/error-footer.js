import { Link } from "react-router-dom";

/**
 * Common footer for the error views.
 * @returns {JSX.Element}
 */
const ErrorFooter = () => (
  <>
    <a
      href="/"
      className="btn btn-outline-secondary border text-secondary border-secondary me-2"
    >
      Home
    </a>
    <Link to={-1} replace className="btn btn-secondary">
      Back
    </Link>
  </>
);

export default ErrorFooter;
