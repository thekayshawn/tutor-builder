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
  DEFAULT_ERROR_MESSAGE: "Oops 🤫 Something went wrong.",
  DEFAULT_EMPTY_MESSAGE: "Well 🙂 There's nothing to show here.",
};

export default strings;
