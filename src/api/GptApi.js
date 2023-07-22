import Api from './Api';
import { gptApiOptions } from './api-options';

class GptApi extends Api {
  /**
   * @param {object} options
   * @param {string} options.baseURL
   * @param {object} options.errorMessages
   * @param {object} options.headers
   */
  constructor({ baseURL, errorMessages, headers }) {
    super({ baseURL, errorMessages });

    this._reqOpt = {
      headers,
    };
  }

  /**
   * @param {String} question
   * @returns {Promise}
   */
  getAnswer(question) {
    return super.request(
      '',
      {
        method: '',
        body: JSON.stringify(question),
        ...this._reqOpt,
      },
      'getAnswer'
    );
  }
}

const gptApi = new GptApi(gptApiOptions);

export { gptApi };
