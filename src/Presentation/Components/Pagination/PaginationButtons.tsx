import * as React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import type {
  PaginationItemProps,
  PaginationItemButtonProps,
} from "./PaginationTypes";

// Static.
//import styles from "./Pagination.module.css";

/**
 * @returns {JSX.Element}
 */
export const TraversalButton = ({
  onClick,
  children,
  isDisabled,
}: Pick<
  PaginationItemProps,
  "onClick" | "children" | "isDisabled"
>): JSX.Element => (
  <li onClick={onClick}>
    <button
      disabled={isDisabled}
      className="btn btn-sm border rounded bg-light fs-5"
    >
      {children}
    </button>
  </li>
);

/**
 * @returns {JSX.Element}
 */
export const PreviousButton = ({
  currentHead,
  onChangeHead,
}: Pick<
  PaginationItemButtonProps,
  "currentHead" | "onChangeHead"
>): JSX.Element => {
  const isDisabled = currentHead <= 1;

  let prevIndex = currentHead - 1;

  if (prevIndex <= 0) {
    // Reset to the first page.
    prevIndex = 1;
  }

  return (
    <TraversalButton
      isDisabled={isDisabled}
      // This prevents negative indexing.
      onClick={() => isDisabled || onChangeHead(prevIndex)}
    >
      <IconChevronLeft />
    </TraversalButton>
  );
};

/**
 * @param {TraversalLinkProps} object
 * @returns {JSX.Element}
 */
export const NextButton = ({
  totalItems,
  currentHead,
  itemsPerPage,
  onChangeHead,
}: PaginationItemButtonProps): JSX.Element => {
  // The pointer must point at the last page and that's it.
  // The expression gives us a comparison of this pointer and the ceiled-off
  // resultant of the division of total items (20) by items per page (5). The
  // result would be 4 in our case, and the button will be disabled when the
  // 4th, or last, page is displayed.
  const isDisabled = currentHead === Math.ceil(totalItems / itemsPerPage);

  return (
    <TraversalButton
      isDisabled={isDisabled}
      onClick={() =>
        isDisabled ||
        onChangeHead(
          // Just skip to the next page.
          1 + currentHead
        )
      }
    >
      <IconChevronRight />
    </TraversalButton>
  );
};
