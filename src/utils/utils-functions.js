import { URL_LOGOUT } from "../env";

/**
 * Get the headers required for an authorized request.
 * @param {string} token the Authentication token.
 * @returns {Object} The required headers.
 */
export const getAuthHeaders = (token) => ({
  "X-Auth-Token": token,
  Accept: "application/json",
  "Content-Type": "application/json",
});

/**
 * @return {boolean}
 * Whether an object is an object and has atleast one entry.
 *
 * @see https://stackoverflow.com/a/32108184/14716989
 */
export const isObjectValid = (object) =>
  object &&
  Object.keys(object).length > 0 &&
  Object.getPrototypeOf(object) === Object.prototype;

export function logout() {
  localStorage.removeItem("user");
  window.open(URL_LOGOUT);
}
