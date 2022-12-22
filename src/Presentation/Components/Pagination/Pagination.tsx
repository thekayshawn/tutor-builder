import * as React from "react";
import { isNumber } from "@Core/Helpers/utils";

// Features.
import PaginationItem from "./PaginationItem";
import PaginationOverflow from "./PaginationOverflow";
import type { PaginationProps } from "./PaginationTypes";
import { NextButton, PreviousButton } from "./PaginationButtons";

const maxOverflow = 1;

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
 * @param {MyPaginationProps} object
 * @returns {JSX.Element}
 *
 * @version 0.0.5
 * @author kashan-ahmad
 *
 * @changelog
 * - 0.0.5: Introduced permanent last and page items and truncated the shown
 * elements over a conditional threshold.
 * - 0.0.4: Introduced `PaginationOverflows` to display ellipsis.
 * - 0.0.3: Extracted the `PaginationItem` as `PaginationItem`.
 * - 0.0.2: Fixed disabled link still showing color on hover/focus.
 * - 0.0.1: Initial version.
 */
export default function Pagination({
  totalItems,
  onChangePage,
  currentPage = 0,
  itemsPerPage = 5,
  className = "",
  ...props
}: PaginationProps): JSX.Element {
  if (
    !isNumber(totalItems) ||
    !isNumber(itemsPerPage) ||
    !isNumber(currentPage)
  ) {
    console.error(
      "😿 One or more of the parameters passed to pagination isn't a number."
    );
    return <></>;
  }

  /**
   * The division results in a number of pages that can contain all the items
   * with respect to the itemsPerPage property. 10 items with 5 per page would
   * result in 2 pages, 11 would result in 3.
   */
  const numOfPages = Math.ceil(totalItems / itemsPerPage);

  // No Pagination when the dataset requires a single page.
  if (numOfPages <= 1) return <></>;

  // Array of the same number of pages.
  const pages = [...Array(numOfPages).keys()];

  return (
    <ul
      {...props}
      className={`ms-0 me-3 d-flex gap-2 align-items-center flex-wrap ${className}`}
    >
      {/* Previous Arrow. */}
      <PreviousButton currentHead={currentPage} onChangeHead={onChangePage} />
      {/* Button for the first page. */}
      <PaginationItem
        index={0}
        onChangePage={onChangePage}
        isActive={currentPage === 1}
      />
      {/* Handler to display ellipsis when the allowed threshold is reached. */}
      <PaginationOverflow
        {...{ pages, currentPage, maxOverflow, overflowType: "prefix" }}
      />
      {/* The whole structure generated above goes like this: < 1 ... */}
      {/* It's rendering time. */}
      {pages.map((index, _, arr) => {
        // Since we display the items for the first and last page separately,
        // no need to render them.
        if (index === 0 || index === arr.length - 1) return null;

        // The element at the index of the array, adding 1 to whom equals to the number of the current page. If the array has 10 pages, the currentPage is 5, then the 4th page is the one that's active.
        const isActive = currentPage === index + 1;

        // Stop the rendering of items that have fallen behind the maximum limit of allowed items.
        // In simpler words, don't render pages that come before the current page if they don't demand to be rendered.
        // Let's say the current page is 5, the allowed or max overflow is 1, the items 1-3 won't render as currentPage - maxOverflow = 4.
        //1 is added to the index as the comparison page starts from 1, unlike the array's index, which starts from 0
        if (index + 1 < currentPage - maxOverflow) return null;

        // The exact opposite, excludes the upcoming items post-threshold.
        if (index + 1 > currentPage + maxOverflow) return null;

        return (
          <PaginationItem key={index} {...{ index, isActive, onChangePage }} />
        );
      })}
      {/* Just like the 3 items before the items, we have ... 10 > */}
      <PaginationOverflow
        {...{ pages, currentPage, maxOverflow, overflowType: "suffix" }}
      />
      {/* The last item. */}
      <PaginationItem
        index={pages.length - 1}
        onChangePage={onChangePage}
        isActive={currentPage === pages.length}
      />
      {/* The right arrow. */}
      <NextButton
        totalItems={totalItems}
        currentHead={currentPage}
        itemsPerPage={itemsPerPage}
        onChangeHead={onChangePage}
      />
    </ul>
  );
}
