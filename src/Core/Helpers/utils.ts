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
