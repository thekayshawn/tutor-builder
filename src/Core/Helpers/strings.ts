export const messages = {
  SAVED: "All changes saved",
  ADDED: "Added successfully",
  /**
   * @param {string} label The label to represent the threshold with
   * @param {number} limit The maximum limit of the threshold
   * @returns {string}
   */
  THRESHOLD_BREACHED: (label: string, limit: number): string =>
    `You can't add more than ${limit} ${label}, please contact support!`,

  FILE_SIZE_EXCEEDED: (megaBytes: number): string =>
    `Please select a file smaller than ${megaBytes}MB`,
};

const strings = {
  DEFAULT_EMPTY_MESSAGE: "No results found",
  DEFAULT_ERROR_MESSAGE: "Something went wrong",
  DEFAULT_SUCCESS_MESSAGE: "Operation successful",
};

export default strings;
