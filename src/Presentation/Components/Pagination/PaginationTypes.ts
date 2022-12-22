import * as React from "react";

export type PaginationItemProps = {
  index: number;

  isActive?: boolean;

  isDisabled?: boolean;

  onChangePage: PaginationProps["onChangePage"];
} & React.ComponentPropsWithoutRef<"li">;

export type PaginationItemButtonProps = {
  /**
   * The current page or index.
   */
  currentHead: number;

  itemsPerPage: number;

  totalItems: number;

  onChangeHead: (newHead: number) => void;
} & React.ComponentPropsWithoutRef<"button">;

export type PaginationOverflowProps = {
  /**
   * The array of pages to truncate.
   */
  pages: number[];

  /**
   * The page currently selected.
   */
  currentPage: number;

  /**
   * The maximum items that can be displayed around the selected/current page.
   */
  maxOverflow: number;

  /**
   * The type of overflow to render ellipsis for. This decides whether the items
   * before the current page are truncated or the ones after it.
   */
  overflowType: "prefix" | "suffix";
};

export type PaginationProps = {
  /**
   * The total number of items.
   */
  totalItems: number;

  /**
   * Number of items per page. Defaults to 5.
   */
  itemsPerPage: number;

  /**
   * The page to start displaying from. Defaults to `1`.
   */
  currentPage: number;

  /**
   * The new page to start displaying the list from.
   * @param {number} newPage
   * @returns {void}
   */
  onChangePage: (newPage: number) => void;
} & React.ComponentPropsWithoutRef<"ul">;
