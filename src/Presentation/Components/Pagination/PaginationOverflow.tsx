import * as React from "react";
import type { PaginationOverflowProps } from "./PaginationTypes";

/**
 * Overflow handler for pagination items. Displays an ellipsis if the
 * conditions are met.
 *
 * @param {PaginationOverflowProps} props
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function PaginationOverflow({
  pages,
  currentPage,
  maxOverflow,
  overflowType,
}: PaginationOverflowProps): JSX.Element {
  // The index where the prefix starts from, it ends at the current page ofc.
  // Note the `OR pages.length` as when the last page is selected, the
  // currentPage, which starts from 1, exceeds the pages' indices, hence the
  // length of the array is where the currentPage stands.
  const prefixStart = (pages[currentPage] || pages.length) - maxOverflow;

  // The suffix starts from the point where the allowed items post-currentPage
  // end.
  const suffixStart = pages[currentPage] + maxOverflow;

  // Whether the calculated index is a valid index. If Yes, we're overflowing.
  // Note the condition at the end, since we're displaying the first item in all cases, we need to skip it.
  const hasExceededPrefix = !!pages[prefixStart] && prefixStart !== 1;

  // Pretty similar.
  const hasExceededSuffix = !!pages[suffixStart];

  if (overflowType === "prefix" && hasExceededPrefix) return <>...</>;

  if (overflowType === "suffix" && hasExceededSuffix) return <>...</>;

  return <></>;
}
