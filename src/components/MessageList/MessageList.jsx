import React, { forwardRef } from 'react';

import './MessageList.css';

const MessageList = ({ messages }, ref) => {
  const messageItems = messages?.map((message, i) => (
    <li
      key={i}
      className={`chat__message chat__message__sender_${message.sender}`}>
      <p className='chat__message_text'>{message.content}</p>
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
