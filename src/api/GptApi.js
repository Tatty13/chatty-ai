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
      '/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo-0613',
          messages: question,
          temperature: 0,
          max_tokens: 500,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        }),
        ...this._reqOpt,
      },
      'getAnswer'
    );
  }

  getTranscription(audioFile) {
    return super.request(
      '/audio/transcriptions',
      {
        method: 'POST',
        body: JSON.stringify({
          file: audioFile,
          model: "whisper-1",
        }),
        ...this._reqOpt,
      },
      'getTranscription'
    );
  }
}

const gptApi = new GptApi(gptApiOptions);

export { gptApi };
