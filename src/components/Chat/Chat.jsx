import React, { useState, useRef, useEffect } from 'react';

import './Chat.css';

import { createMessage, getGptBotReply } from '../../utils';
import {
  ForwardedMessageList,
  LangSelect,
  TextArea,
  MicBtn,
  ChatSendBtn,
} from '../';

const Chat = ({
  onSaveBtnClick,
  savedMessages,
  messages,
  handleMessageAdd,
  toggleLangListVisibility,
  selectedLanguage,
  handleLanguageSelect,
  isLangListVisible,
  isRecordStart,
  onMicBtnClick,
  transcription,
}) => {
  const [textValue, setTextValue] = useState(
    `Hi, I have job interview soon. I am a  junior UX/UI designer. Can you be an employeer and im an employee, ask me one question at ones`
  );
  const [textRows, setTextRows] = useState(2);
  const [isReadyToGetAnswer, setIsReadyToGetAnswer] = useState(false);

  const handleUserMessageSubmit = async (userMessage) => {
    try {
      const botMessage = await getGptBotReply(userMessage);
      handleMessageAdd(createMessage(botMessage, 'bot'));
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsReadyToGetAnswer(false);
    handleMessageAdd(createMessage(textValue, 'user'));
    handleUserMessageSubmit(textValue);
    setTextValue('');
    setTextRows(1);
  };

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (transcription) {
      setTextValue(transcription);
      transcription.length > 1 && setIsReadyToGetAnswer(true);
    }
  }, [transcription]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsReadyToGetAnswer(textValue.length > 1);
  }, [textValue]);

  return (
    <section className='chat'>
      <ForwardedMessageList
        messages={messages}
        savedMessages={savedMessages}
        onSaveBtnClick={onSaveBtnClick}
        ref={messagesContainerRef}
      />
      <form
        className='chat__from'
        onSubmit={handleSubmit}>
        <div className='chat__input-wrap'>
          <TextArea
            isReadyToGetAnswe={isReadyToGetAnswer}
            setIsReadyToGetAnswer={setIsReadyToGetAnswer}
            textValue={textValue}
            setTextValue={setTextValue}
            textRows={textRows}
          />

          <LangSelect
            onIconClick={toggleLangListVisibility}
            isLangListVisible={isLangListVisible}
            selectedLanguage={selectedLanguage}
            handleLanguageSelect={handleLanguageSelect}
          />
        </div>
        {isReadyToGetAnswer ? (
          <ChatSendBtn />
        ) : (
          <MicBtn
            isRecordStart={isRecordStart}
            onClick={onMicBtnClick}
          />
        )}
      </form>
    </section>
  );
};

export { Chat };
