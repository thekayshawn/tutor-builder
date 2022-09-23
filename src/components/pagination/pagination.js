import PaginationArray from "./pagination-array";
import PaginationPages from "./pagination-pages";
import "./pagination.scss";

/**
 * @typedef PaginationProps
 *
 * @property {"array" | "pages"} type The type of pagination required.
 * - Array deals with paginating through a whole array.
 * - Pages deals with paginating over server-side pages.
 * Defaults to array.
 */

/**
 * A generic pagination component that serves as a controller for items that are MANAGED BY YOU. Yes, you iterate over the items and display them as you please and let this component deal with the headache of displaying some pagination.
 *
 * @param {PaginationProps & import("./pagination-array").PaginationArrayProps & import("./pagination-pages").PaginationPagesProps & JSX.IntrinsicElements['div']} object
 * @returns {JSX.Element}
 *
 * @version 0.0.1
 * @author kashan-ahmad
 *
 * @changelog
 * - 0.0.1: Initial version.
 */
function Pagination({ type = "array", ...props }) {
  const Component = {
    array: PaginationArray,
    pages: PaginationPages,
  }[type];

  return <Component {...props} />;
}

export default Pagination;
