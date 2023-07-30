import Api from './Api';
import { speechflowApiOptions } from './api-options';

class SpeechflowApi extends Api {
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
   * @param {FormData} formData - data with audio file
   * @param {string} lang
   * @returns {Promise}
   */
  sendVoice(formData, lang = 'en') {
    return super.request(
      `/create?lang=${lang}`,
      {
        method: 'POST',
        body: formData,
        ...this._reqOpt,
      },
      'getTranscription'
    );
  }

  /**
   * @param {string} taskId
   * @returns {Promise}
   */
  getTranscription(taskId) {
    return super.request(
      `/query?taskId=${taskId}&resultType=4`,
      {
        method: 'GET',
        ...this._reqOpt,
      },
      'getTranscription'
    );
  }
}

const speechflowApi = new SpeechflowApi(speechflowApiOptions);

export { speechflowApi };
