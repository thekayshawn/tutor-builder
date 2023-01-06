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

/**
 * Get the headers required for an authorized request.
 *
 * @returns {Record<string, string>} The required headers.
 */
export function getAuthHeaders(token: string): Record<string, string> {
  return {
    "X-Auth-Token": token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

/**
 * @return {boolean}
 * Whether an object is an object and has at least one entry.
 *
 * @see https://stackoverflow.com/a/32108184/14716989
 */
export const isValidObject = (object: unknown): boolean =>
  !!object &&
  Object.keys(object).length > 0 &&
  Object.getPrototypeOf(object) === Object.prototype;

/**
 * Generates a formData instance based on the key-value pairs of an object.
 *
 * @returns {FormData}
 */
export function getFormDataFromObject(object: unknown): FormData {
  if (!isValidObject(object)) {
    throw new Error("Please provide an actual object to getFormDataFromObject");
  }

  const formData = new FormData();

  Object.entries(object as Record<string, string>).forEach(([key, value]) =>
    formData.append(key, value)
  );

  return formData;
}
