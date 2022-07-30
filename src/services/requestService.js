import axios from 'axios';

export const requestService = {
  /**
   * Send DELETE request.
   *
   * @param {string} url - request url
   * @returns {Promise}
   */
  delete: async (url) => axios.delete(url),

  /**
   * Send GET request.
   *
   * @param {string} url - request url
   * @returns {Promise}
   */
  get: async (url) => axios.get(url),

  /**
   * Send POST request.
   *
   * @param {string} url - request url
   * @param {object} payload - request payload
   * @returns {Promise}
   */
  post: async (url, payload = {}) => axios.post(
    url,
    payload
  ),

  /**
   * Send PUT request.
   *
   * @param {string} url - request url
   * @param {object} payload - request payload
   * @returns {Promise}
   */
  put: async (url, payload = {}) => axios.put(url, payload),
};
