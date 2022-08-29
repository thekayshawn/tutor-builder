/* eslint-disable eqeqeq */
import axios from "axios";
import { isObjectValid } from "../utils";

async function service({ proposal, boolBacks }) {
  const { onSuccess, onFailure } = boolBacks;

  try {
    const response = await axios(proposal);

    if (response.status === 200) {
      const { data, status } = response;

      // Well, an extra layer of protection never hurts 😉
      if (data && status == 200) {
        onSuccess?.(data);
        return;
      }
    }

    // Why do we fall Bruce? Only to rise back up.
    console.error(JSON.stringify(response));
    onFailure?.(JSON.stringify(response));
  } catch (error) {
    if (error.response) {
      // Status code is something but not 200.
      console.error({ error: error.response });
      onFailure?.({ error: error.response });
      return;
    }

    if (error.request) {
      // No response was received.
      console.error("Server timed out!", error.request);
      onFailure?.("Server timed out!", error.request);
      return;
    }

    if (error.message) {
      // Error setting up the request.
      console.error("Error setting up the service!", error.message);
      onFailure?.("Error setting up the service!", error.message);
      return;
    }

    console.error(error);
    onFailure?.(error);
  }
}

function getProposal({ url, headers, method }) {
  if (!url) throw new Error("ApiService requires a valid url to proceed!");

  const proposal = {};

  if (isObjectValid(headers)) proposal["headers"] = headers;

  proposal["url"] = url;
  proposal["method"] = method;

  return proposal;
}

/**
 * Perform a GET request.
 *
 * @param {Object} object The parameters passed.
 * @param {string} object.url The endpoint to send the request to.
 * @param {{ key: string, value: string | Array }[]} object.data
 * The body of the request, must be an
 * array of the objects of the form {key, value} where;
 * - key: the string-based URL query parameter,
 * - value: the value for the URL query parameter,
 * @param {Object} object.headers The headers of the request.
 * @param {{
 * onSuccess: (response: any) => void,
 * onFailure: (error: any) => void
 * }} object.boolBacks The boolean callback methods:
 * Can be anything but undefined, but must have one of these
 * for callback functionalities.:
 * - onSuccess => The successful callback, returns the request data.
 * - onFailure => The failed callback, returns the erred data.
 */
function get({ url, data, headers, ...boolBacks }) {
  const params = {};

  data?.[0]?.key &&
    data?.[0]?.value &&
    data.forEach(
      ({ key, value }) =>
        (params[key] = Array.isArray(value) ? JSON.stringify(value) : value)
    );

  service({
    boolBacks,
    proposal: getProposal({
      headers,
      method: "get",
      url: isObjectValid(params)
        ? `${url}?${new URLSearchParams(params)}`
        : url,
    }),
  });
}

/**
 * Perform a POST request.
 *
 * @param {Object} object The parameters passed.
 * @param {string} object.url The endpoint to send the request to.
 * @param {Object} object.data The body of the request.
 * @param {Object} object.headers The headers of the request.
 * @param {{
 * onSuccess: (response: any) => void,
 * onFailure: (error: any) => void
 * }} object.boolBacks The boolean callback methods:
 * Can be anything but undefined, but must have one of these
 * - onSuccess => The successful callback, returns the request data.
 * - onFailure => The failed callback, returns the erred data.
 */
function post({ url, data, headers, ...boolBacks }) {
  service({
    boolBacks,
    proposal: { ...getProposal({ url, method: "post", headers }), data },
  });
}

/**
 * Perform a DELETE request.
 *
 * @param {Object} object The parameters passed.
 * @param {string} object.url The endpoint to send the request to.
 * @param {number} object.recordId The id of the record to delete.
 * @param {Object} object.headers The headers of the request.
 * @param {{
 * onSuccess: (response: any) => void,
 * onFailure: (error: any) => void
 * }} object.boolBacks The boolean callback methods:
 * Can be anything but undefined, but must have one of these
 * - onSuccess => The successful callback, returns the request data.
 * - onFailure => The failed callback, returns the erred data.
 */
function deleteRecord({ url, recordId, headers, ...boolBacks }) {
  service({
    boolBacks,
    proposal: getProposal({
      headers,
      method: "delete",
      url: `${url}/${recordId}`,
    }),
  });
}

const apiService = {
  get,
  post,
  delete: deleteRecord,
};

export default apiService;
