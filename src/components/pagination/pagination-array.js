import React from "react";
import {
  PaginationItem,
  PaginationLink,
  Pagination as PaginationNav,
} from "reactstrap";
import { isStrictlyNumeric } from "../../utils/utils-functions";
import { NextLink, PreviousLink } from "./pagination-links";

/**
 * @typedef PaginationArrayProps
 *
 * @property {number} totalItems The number of items.
 *
 * @property {number} itemsPerPage
 * Number of items per page.Defaults to 5.
 *
 * @property {number} currentIndex The index from which the
 * list starts to display. Defaults to `0`.
 *
 * @property {(newIndex: number) => void} onChangeIndex
 * The new index to start displaying the list from.
 */

/**
 * A generic pagination component that serves
 * as a controller for a list of items that's
 * MANAGED BY YOU. You have to manage the state
 * by yourself, the component will render out
 * customizable buttons to control the list
 * through a pointer.
 *
 * You will receive updates about the user's
 * actions and you'll have to manage the state
 * accordingly.
 *
 * The `onChangeIndex` callback will provide you
 * with a new index to render out the list from,
 * that's all that's needed to be done.
 *
 * @param {PaginationArrayProps & JSX.IntrinsicElements['div']} object
 * @returns {JSX.Element}
 *
 * @version 0.0.2
 * @author kashan-ahmad
 *
 * @changelog
 * - 0.0.2: Fixed disabled link still showing color on hover/focus.
 * - 0.0.1: Initial version.
 */
function PaginationArray({
  totalItems,
  itemsPerPage = 5,
  currentIndex = 0,
  onChangeIndex,
  ...props
}) {
  if (
    !isStrictlyNumeric(totalItems) ||
    !isStrictlyNumeric(itemsPerPage) ||
    !isStrictlyNumeric(currentIndex)
  ) {
    console.error(
      "😿 One or more of the parameters passed to pagination isn't a number."
    );
    return;
  }

  return (
    <PaginationNav listClassName="m-0 hstack gap-1 flex-wrap" {...props}>
      <PreviousLink
        type="array"
        currentHead={currentIndex}
        itemsPerPage={itemsPerPage}
        onChangeHead={onChangeIndex}
        {...{ currentIndex, itemsPerPage, onChangeIndex }}
      />
      {/* The division results in a number of pages
    that can contain all the items with respect to
    the itemsPerPage property. 10 items with 5 per page
    would result in 2 pages, 11 would result in 3. */}
      {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map((index) => {
        const isActive =
          // TRUE when the pointer is at an index
          // greater than or equal to the page's start.
          //
          // This means that for the pointer at 0 and the items
          // per page of 5, it will be true if greater than atleast 0.
          currentIndex >= index * itemsPerPage &&
          // TRUE when the pointer is at an index
          // lesser than the page's end.
          //
          // This means that for the pointer at 0 and the items
          // per page of 5, it will be true if lesser than 5.
          // This will make it TRUE for the range 0-4, that is the
          // first 5 indices, for the pointer at 0 and items per page of 5.
          currentIndex < index * itemsPerPage + itemsPerPage;

        return (
          <PaginationItem key={index} active={isActive}>
            <PaginationLink
              onClick={() => isActive || onChangeIndex(index * itemsPerPage)}
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
        type="array"
        totalItems={totalItems}
        currentHead={currentIndex}
        itemsPerPage={itemsPerPage}
        onChangeHead={onChangeIndex}
      />
    </PaginationNav>
  );
}

export default PaginationArray;
