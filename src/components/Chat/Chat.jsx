import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import initialMessages from './initialMessages';
import { ForwardedMessageList } from '../MessageList/MessageList';
import { MicBtn } from '../MicBtn/MicBtn';
import { ChatSendBtn } from '../ChatSendBtn/ChatSendBtn';
import { createMessage } from '../../utils/helpers/create-message';
import { gptApi } from '../../api/GptApi';
import { LangSelect } from '../LangSelect/LangSelect';

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

  const textareaRef = useRef(null);

  const handleUserMessageSubmit = async (userMessage) => {
    try {
      const botReply = await gptApi.getAnswer([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage },
      ]);

      const botMessage = botReply.choices[0].message.content;

      setMessages((prev) => [...prev, createMessage(botMessage, 'bot')]);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
    }
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value.trimStart()); // Обновляем состояние textValue при изменении текста в поле ввода
    adjustTextareaHeight(); // Вызываем функцию для автоматического изменения высоты textarea
    if (!isReadyToGetAnswer && event.target.value.length > 1)
      setIsReadyToGetAnswer(true);
    if (isReadyToGetAnswer && event.target.value.length < 2)
      setIsReadyToGetAnswer(false);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Сначала установим высоту textarea на "auto" для сброса размера
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Зададим высоту textarea на основе его содержимого
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsReadyToGetAnswer(false);
    setMessages((prev) => [...prev, createMessage(textValue, 'user')]);
    handleUserMessageSubmit(textValue);
    setTextValue('');
  };

  const handleEnterKey = (evt) => {
    if (
      evt.keyCode === 13 &&
      evt.shiftKey === false &&
      textValue.trimEnd().length > 1
    ) {
      evt.preventDefault();
      evt.target.form.requestSubmit();
    }
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
          <textarea
            ref={textareaRef}
            className='chat__textarea'
            placeholder='Send a message'
            value={textValue}
            rows={1}
            onChange={handleTextChange}
            onKeyDown={handleEnterKey}
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
