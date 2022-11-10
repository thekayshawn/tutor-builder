import { URL_LOGOUT } from "../env";

/**
 * Get the headers required for an authorized request.
 * @param {string | undefined} token the Authentication token.
 * @returns {Object} The required headers.
 */
export const getAuthHeaders = (token) => {
  return {
    "X-Auth-Token":
      token || JSON.parse(localStorage.getItem("user") || "{}").access_token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

/**
 * Generates a formData instance based on the key-value
 * pairs of an object.
 *
 * @param {Object} object
 *
 * @returns {FormData}
 */
export function getFormDataFromObject(object) {
  if (!isObjectValid(object))
    throw new Error("😑 What a mess. This object isn't even a valid object");

  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => formData.append(key, value));

  return formData;
}

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

/**
 * @see https://stackoverflow.com/a/24457420
 * @param {any} subject
 * @returns {Boolean}
 */
const isNumeric = (subject) => /^-?\d+$/.test(subject);

/**
 * Stricly checks if even the type of a value is number o not.
 * @param {any} subject
 * @returns {Boolean}
 */
export const isStrictlyNumeric = (subject) =>
  typeof subject === "number" && isNumeric(subject);

/**
 * @see https://stackoverflow.com/a/46639837
 */
export const getBase64FromFile = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });

export function logout() {
  localStorage.removeItem("user");
  window.open(URL_LOGOUT);
}
