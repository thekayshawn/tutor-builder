import { Breakpoint } from "@Data/Types";

// data-type-related utils.
export function isNumber(entity: any): entity is number {
  const parsedEntity = parseInt(entity);

  if (isNaN(parsedEntity)) return false;

  if (typeof parsedEntity !== "number") return false;

  return true;
}

// window related utils.
/**
 * Removes all of the search params from the URL without reloading the page.
 * @returns void
 */
export function removeAllSearchParams() {
  window.history.pushState({}, document.title, window.location.pathname);
}

/**
 * Get a breakpoint name off a specified size.
 *
 * @returns {Breakpoint}
 */
export function getBreakpointFromSize(size: number): Breakpoint {
  if (size <= 557) return "sm";

  if (size <= 768) return "md";

  if (size <= 992) return "lg";

  if (size <= 1200) return "xl";

  if (size <= 1400) return "xxl";

  return "xs";
}
