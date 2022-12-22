import * as React from "react";
import styles from "./Pagination.module.css";
import type { PaginationItemProps } from "./PaginationTypes";

/**
 * Custom pagination item, extended from Reactstrap's PaginationItem.
 *
 * @param {Object} props
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function PaginationItem({
  index,
  children,
  onChangePage,
  isActive = false,
  isDisabled = false,
  className = "",
}: PaginationItemProps): JSX.Element {
  return (
    <li className={`${styles.pagination__item} ${className}`}>
      <button
        disabled={isDisabled}
        data-active={isActive.toString()}
        className={styles.pagination__button}
        onClick={() => isActive || isDisabled || onChangePage(1 + index)}
      >
        {children || index + 1}
      </button>
    </li>
  );
}
