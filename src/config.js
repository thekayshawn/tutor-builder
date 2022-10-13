export const MAIN_URL = process.env.REACT_APP_MAIN_URL;
export const WEBSITE_URL = process.env.REACT_APP_URL_WEBSITE;
export const VIDEO_TOOL_URL = process.env.REACT_APP_VIDEO_CALL_TOOL;
export const API_MAIN_URL = process.env.REACT_APP_URL_USER_SERVICE;
export const CONTENT_TOOL_URL = process.env.REACT_APP_CONTENT_BUILDER_URL;
export const URL_DASHBOARD_PRICING =
  process.env.REACT_APP_URL_DASHBOARD_PRICING;

export const integers = {
  REDIRECTION: 3000,
};

export const strings = {
  /**
   * key of the action for the content-builder's continue button.
   */
  KEY_ACTION_CONTINUE: "continue",
};

const config = {
  strings,
  integers,
};

export default config;
