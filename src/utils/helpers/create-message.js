/**
 * @param {string} content - message text
 * @param {'user' | 'bot' | 'poll' | 'error'} sender
 * @returns
 */
export function createMessage(content, sender) {
  return {
    content,
    sender,
  };
}
