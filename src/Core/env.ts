export const URL = process.env.REACT_APP_URL;
export const URL_LOGOUT = process.env.REACT_APP_URL_LOGOUT;
export const URL_WEBSITE = process.env.REACT_APP_URL_WEBSITE;
export const URL_DASHBOARD = process.env.REACT_APP_URL_DASHBOARD;
export const URL_USER_SERVICE = process.env.REACT_APP_URL_USER_SERVICE;
export const URL_DASHBOARD_PRICING =
  process.env.REACT_APP_URL_DASHBOARD_PRICING;
export const URL_DASHBOARD_CONTENT_BUILDER =
  process.env.REACT_APP_URL_DASHBOARD_CONTENT_BUILDER;
/* -----------------------------------------------------------------------------
 * General Limitations.
 * -------------------------------------------------------------------------- */
export const MAX_PAGES_PER_MATERIAL =
  process.env.REACT_APP_MAX_PAGES_PER_MATERIAL || 10;
export const MIN_WIDTH_BUILDER = parseInt(
  process.env.REACT_APP_BUILDER_MIN_WIDTH || "557"
);
