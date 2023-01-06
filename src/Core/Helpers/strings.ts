export const messages = {
  /**
   * @param {number} limit The maximum limit of the threshold
   * @param {string} label The label to represent the threshold with
   * @returns {string}
   */
  THRESHOLD_BREACHED: (limit: number, label: string): string =>
    `You can't add more than ${limit} ${label}, please contact support!`,
};

const strings = {
  DEFAULT_EMPTY_MESSAGE: "No results found",
  DEFAULT_ERROR_MESSAGE: "Something went wrong",
  DEFAULT_SUCCESS_MESSAGE: "Operation successful",
  SAVED: "All changes saved",
  THRESHOLD_REACHED: (of: string, threshold: number) =>
    `Can't create more than ${threshold} ${of}, please contact support`,
};

export default strings;
