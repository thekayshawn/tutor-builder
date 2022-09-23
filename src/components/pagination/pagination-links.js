import { PaginationLink } from "reactstrap";

/**
 * @typedef {Object} PaginationTraversalLinkProps
 * @property {import("./pagination").PaginationProps['type']} type
 * @property {number} currentHead The current page or index.
 * @property {number} itemsPerPage
 * @property {number | undefined} totalItems
 * @property {(newHead) => void} onChangeHead
 */

/**
 * @param {import("reactstrap").PaginationLinkProps} object
 * @returns {JSX.Element}
 */
export const TraversalLink = ({ onClick, isDisabled, children }) => (
  <PaginationLink
    onClick={onClick}
    disabled={isDisabled}
    className={`p-1 rounded bg-white border hstack ${
      isDisabled ? "text-disabled" : "text-dark"
    }`}
  >
    {children}
  </PaginationLink>
);

/**
 * @param {PaginationTraversalLinkProps} object
 * @returns {JSX.Element}
 */
export const PreviousLink = ({
  type,
  currentHead,
  itemsPerPage,
  onChangeHead,
}) => {
  const isDisabled = currentHead <= 1;

  let newIndex =
    type === "array"
      ? // In case of an array, it's appropriate to just go back the number of items that are being displayed and start the slice from there.
        currentHead - itemsPerPage
      : // In case of a page, all that's required is a little subtraction.
        currentHead - 1;

  if (newIndex <= 0) {
    // Pages start from 1, arrays start from 0
    newIndex = type === "array" ? 0 : 1;
  }

  return (
    <TraversalLink
      isDisabled={isDisabled}
      // This prevents negative indexing.
      onClick={() => isDisabled || onChangeHead(newIndex)}
    >
      <ion-icon name="chevron-back-outline"></ion-icon>
    </TraversalLink>
  );
};

/**
 * @param {PaginationTraversalLinkProps} object
 * @returns {JSX.Element}
 */
export const NextLink = ({
  type,
  totalItems,
  currentHead,
  itemsPerPage,
  onChangeHead,
}) => {
  const isDisabled =
    type === "array"
      ? // For an array, the next button is disabled when the last set of items is displayed, which is the last page.
        //Let's suppose that the pointer/head is at 16, the total items are 20, and the items per page are 5, the following expression states that the button will be disabled when the current pointer is pointing somewhere greater than 15, which would be the last slice of the array to display.
        currentHead >= totalItems - itemsPerPage
      : // In the case of a page, the pointer must point at the last page and that's it. The expression gives us a comparison of this pointer and the ceiled-off resultant of the division of total items (20) by items per page (5). The result would be 4 in our case, and the button will be disabled when the 4th, or last, page is displayed.
        currentHead === Math.ceil(totalItems / itemsPerPage);

  return (
    <TraversalLink
      isDisabled={isDisabled}
      onClick={() =>
        isDisabled ||
        onChangeHead(
          type === "array"
            ? // We jump the current items per page when it's an array as that results in the next slice being rendered.
              currentHead + itemsPerPage
            : // Just skip to the next page when it's a page.
              1 + currentHead
        )
      }
    >
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </TraversalLink>
  );
};
