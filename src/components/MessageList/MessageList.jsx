import React, { forwardRef } from 'react';

import './MessageList.css';

const MessageList = ({ messages, savedMessages, onSaveBtnClick }, ref) => {
  const messageItems = messages?.map(({ sender, content }, i) => {
    const isSaved = savedMessages.find(
      (message) => message.content === content && message.sender === sender
    );
    return (
      <li
        key={i}
        className={`chat__message chat__message_sender_${sender}`}>
        <p className='chat__message_text'>{content}</p>
        <button
          type='button'
          className={`btn chat__message-btn chat__message-btn_sender_${sender} ${
            isSaved ? 'chat__message-btn_saved' : ''
          }`}
          onClick={() => onSaveBtnClick(isSaved, { content, sender })}
        />
      </li>
    );
  });
  return (
    <ul
      className='list chat__messages'
      ref={ref}>
      {messageItems}
    </ul>
  );
};

export const ForwardedMessageList = forwardRef(MessageList);
