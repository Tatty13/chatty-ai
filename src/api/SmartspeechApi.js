import Api from './Api';
import { smartspeechApiOptions } from './api-options';

class SmartspeechApi extends Api {
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

  getTranscription(audio) {
    return super.request(
      '',
      {
        method: '',
        body: JSON.stringify(audio),
        ...this._reqOpt,
      },
      'getTranscription'
    );
  }
}

const smartspeechApi = new SmartspeechApi(smartspeechApiOptions);

export { smartspeechApi };
