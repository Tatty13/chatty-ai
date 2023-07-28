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

  sendVoice(file, lang = 'en') {
    return super.request(
      `/create?lang=${lang}`,
      {
        // mode: 'no-cors',
        method: 'POST',
        file: file,
        ...this._reqOpt,
      },
      'getTranscription'
    );
  }

  getTranscription(taskId) {
    return super.request(
      `/query?taskId=${taskId}`,
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
