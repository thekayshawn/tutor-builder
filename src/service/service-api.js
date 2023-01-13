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
      onFailure?.(error.response);
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
 * @param {Object & {
 * url: string
 * headers: Object
 * onSuccess: (data: any) => void,
 * onFailure: (message: string) => void,
 * data: undefined | { key: string, value: any | Array<any> }[],
 * }} object The parameters passed.
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
 * @param {{
 * onSuccess: (data: any) => void
 * onFailure: (error: any) => void
 * url: string
 * data: Object
 * headers: Object
 * }} object The parameters passed.
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
