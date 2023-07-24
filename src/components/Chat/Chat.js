import React from 'react';

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat__messages'>
        <div className='chat__message message_user'>
          <div className='chat__message_user-logo'>User Avatar</div>
          <div className='chat__message_text'>User message here</div>
        </div>
        <div className='chat__message message_bot'>
          <div className='chat__message_bot-logo'>Bot Avatar</div>
          <div className='chat__message_text'>Bot message here</div>
        </div>
      </div>
      <div className='chat__input-container'>
        <div className='chat__input'>
          <p className='chat__label'>Send a message</p>
          <input className='chat__text' type='text' placeholder='Type your message here' />
        </div>
        <div className='chat__language-selector'>
          <select>
            <option value='en'>English</option>
            <option value='fr'>French</option>
            <option value='es'>Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
};


export default Chat;