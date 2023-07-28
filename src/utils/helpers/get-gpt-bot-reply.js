import { gptApi } from '../../api';

/**
 * @param {String} userMessage
 * @returns
 */
async function getGptBotReply(userMessage) {
  const botReply = await gptApi.getAnswer(userMessage);
  const botMessage = botReply.choices[0].message.content;
  return botMessage;
}

export { getGptBotReply };
