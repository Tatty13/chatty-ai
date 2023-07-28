import React, { useState, useRef, useEffect } from 'react';

import './Chat.css';

import initialMessages from './initialMessages';
import { createMessage, getGptBotReply } from '../../utils';
import {
  ForwardedMessageList,
  LangSelect,
  TextArea,
  MicBtn,
  ChatSendBtn,
} from '../';

const Chat = ({
  toggleLangListVisibility,
  selectedLanguage,
  handleLanguageSelect,
  isLangListVisible,
  isRecordStart,
  onMicBtnClick,
  transcription,
}) => {
  const [textValue, setTextValue] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isReadyToGetAnswer, setIsReadyToGetAnswer] = useState(false);

  const handleUserMessageSubmit = async (userMessage) => {
    try {
      const botMessage = await getGptBotReply(userMessage);
      setMessages((prev) => [...prev, createMessage(botMessage, 'bot')]);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsReadyToGetAnswer(false);
    setMessages((prev) => [...prev, createMessage(textValue, 'user')]);
    handleUserMessageSubmit(textValue);
    setTextValue('');
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

  return (
    <section className='chat'>
      <ForwardedMessageList
        messages={messages}
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
