class Api {
  /**
   * @param {object} options
   * @param {string} options.baseURL
   * @param {object} options.errorMessages
   */
  constructor({ baseURL, errorMessages }) {
    this._baseURL = baseURL;
    this._errorMessages = errorMessages;
  }

  /**
   * @param {Response} res
   * @param {string} errorPlace - a key from this._errorMessages object to display specific error message
   * @returns {Promise}
   */
  _getResponseData(res, errorPlace) {
    return res.ok
      ? res.json()
      : res
          .json()
          .then((error) =>
            Promise.reject(
              `${this._errorMessages[errorPlace]}. Ошибка: ${res.status} ${
                error.message || ''
              }`
            )
          );
  }

  /**
   * @param {string} endPoint - a part of URL after baseURL, must start with slash '/'
   * @param {object} options - object with method, headers, body, etc.
   * @param {string} errorPlace - a key from this._errorMessages object to display specific error message
   * @returns {Promise}
   */
  request(endPoint, options, errorPlace) {
    return fetch(`${this._baseURL}${endPoint}`, options).then((res) =>
      this._getResponseData(res, errorPlace)
    );
  }
}

export default Api;
