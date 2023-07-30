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
   * @param {String} botRole - default value - 'You are a helpful assistant.'
   * @returns {Promise}
   */
  getAnswer(question, botRole = 'You are a helpful assistant.') {
    return super.request(
      '/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo-0613',
          messages: [
            { role: 'system', content: botRole },
            { role: 'user', content: question },
          ],
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
}

const gptApi = new GptApi(gptApiOptions);

export { gptApi };
