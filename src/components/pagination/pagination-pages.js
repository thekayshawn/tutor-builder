import React from "react";
import {
  PaginationItem,
  PaginationLink,
  Pagination as PaginationNav,
} from "reactstrap";
import { isStrictlyNumeric } from "../../utils/utils-functions";
import { NextLink, PreviousLink } from "./pagination-links";

/**
 * @typedef PaginationPagesProps
 *
 * @property {number} totalItems The total number of items.
 *
 * @property {number} itemsPerPage
 * Number of items per page.Defaults to 5.
 *
 * @property {number} currentPage The page to start displaying from. Defaults to `1`.
 *
 * @property {(newPage: number) => void} onChangePage
 * The new page to start displaying the list from.
 */

/**
 * A generic pagination component that serves
 * as a controller for a page of items that's
 * MANAGED BY YOU. You have to manage the state
 * by yourself, the component will render out
 * customizable buttons to control the page
 * through a pointer.
 *
 * You will receive updates about the user's
 * actions and you'll have to manage the state
 * accordingly.
 *
 * The `onChangePage` callback will provide you
 * with a new page to render out the list from,
 * that's all that's needed to be done.
 *
 * @param {PaginationPagesProps & JSX.IntrinsicElements['div']} object
 * @returns {JSX.Element}
 *
 * @version 0.0.2
 * @author kashan-ahmad
 *
 * @changelog
 * - 0.0.2: Fixed disabled link still showing color on hover/focus.
 * - 0.0.1: Initial version.
 */
function PaginationPages({
  totalItems,
  itemsPerPage = 5,
  currentPage = 0,
  onChangePage,
  ...props
}) {
  if (
    !isStrictlyNumeric(totalItems) ||
    !isStrictlyNumeric(itemsPerPage) ||
    !isStrictlyNumeric(currentPage)
  ) {
    console.error(
      "😿 One or more of the parameters passed to pagination isn't a number."
    );
    return;
  }

  return (
    <PaginationNav listClassName="m-0 hstack gap-1 flex-wrap" {...props}>
      <PreviousLink
        type="pages"
        currentHead={currentPage}
        itemsPerPage={itemsPerPage}
        onChangeHead={onChangePage}
      />
      {/* The division results in a number of pages
    that can contain all the items with respect to
    the itemsPerPage property. 10 items with 5 per page
    would result in 2 pages, 11 would result in 3. */}
      {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map((index) => {
        const isActive = currentPage === index + 1;

        return (
          <PaginationItem
            key={index}
            active={isActive}
            className="position-relative"
          >
            <PaginationLink
              onClick={() => isActive || onChangePage(1 + index)}
              className={`fw-bold fs-7 p-0 ${
                isActive
                  ? "text-success border-0 rounded-circle"
                  : "border-0 text-secondary"
              }`}
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: isActive ? "#ECF9F3" : "transparent",
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <NextLink
        type="pages"
        totalItems={totalItems}
        currentHead={currentPage}
        itemsPerPage={itemsPerPage}
        onChangeHead={onChangePage}
      />
    </PaginationNav>
  );
}

export default PaginationPages;
