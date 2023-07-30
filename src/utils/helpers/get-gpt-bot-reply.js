import { gptApi } from '../../api';

/**
 * @param {String} userMessage
 * @returns
 */
async function getGptBotReply(userMessage) {
  const gptRole = `You are the employer, and I am the applicant.`;
  const botReply = await gptApi.getAnswer(userMessage, gptRole);
  const botMessage = botReply.choices[0].message.content;
  return botMessage;
}

export { getGptBotReply };
