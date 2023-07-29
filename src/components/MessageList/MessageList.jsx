import React, { forwardRef } from 'react';

import './MessageList.css';

const MessageList = ({ messages, isSaved }, ref) => {
  const messageItems = messages?.map((message, i) => (
    <li
      key={i}
      className={`chat__message chat__message_sender_${message.sender}`}>
      <p className='chat__message_text'>{message.content}</p>
      <button
        type='button'
        className={`btn chat__message-btn chat__message-btn_sender_${
          message.sender
        } ${isSaved ? 'chat__message-btn_saved' : ''}`}
      />
    </li>
  ));
  return (
    <ul
      className='list chat__messages'
      ref={ref}>
      {messageItems}
    </ul>
  );
};

export const ForwardedMessageList = forwardRef(MessageList);
