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

  getTranscription(audioFile) {
    return super.request(
      '',
      {
        method: 'POST',
        body: JSON.stringify({
          file: "audio.mp3",
          model: "whisper-1",
        }),
        ...this._reqOpt,
      },
      'getTranscription'
    );
  }
}


const speechflowApi = new SpeechflowApi(speechflowApiOptions);

export { speechflowApi };
