/* eslint-disable eqeqeq */
export const api_host = "https://dev-api.thetutor.me/contentbuilder";
export const api_hosting = "https://dev-api.thetutor.me/contentbuilder";
export const api_hosting_main = "https://api.thetutor.me";

export const DASHBOARD_URL = process.env.REACT_APP_URL_DASHBOARD;

export const user = JSON.parse(localStorage.getItem("user"));
let userToken =
  user !== null && user.access_token != "" ? user.access_token : "";
export const user_token =
  userToken == "" ? localStorage.getItem("token") : userToken;
