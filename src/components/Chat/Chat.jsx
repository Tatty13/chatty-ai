import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // Подключите свои стили
import initialMessages from './initialMessages';
import { ForwardedMessageList, MessageList } from '../MessageList/MessageList';
import languageIcon from '../../assets/icons/clarity_language-line.svg';
import { languageList } from './language-list';
import { MicBtn } from '../MicBtn/MicBtn';
import { ChatSendBtn } from '../ChatSendBtn/ChatSendBtn';
import { createMessage } from '../../utils/helpers/create-message';

const Chat = ({ isRecordStart, onMicBtnClick }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Язык по умолчанию
  const [textValue, setTextValue] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isReadyToGetAnswer, setIsReadyToGetAnswer] = useState(false);

  const textareaRef = useRef(null);

  const toggleLanguageSelector = () => {
    setShowLanguageSelector((prevShow) => !prevShow);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    toggleLanguageSelector();
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
            onChange={handleTextChange} // Добавляем обработчик onChange для отслеживания изменений в поле ввода
            onKeyDown={handleEnterKey}
          />
          <div className='chat__language-select'>
            <img
              className='chat__language-icon'
              src={languageIcon}
              alt='Language Icon'
              onClick={toggleLanguageSelector}
            />
            <ul
              className={`list chat__language-list ${
                showLanguageSelector ? 'show' : ''
              }`}>
              {languageList.map((item, i) => (
                <li
                  key={i}
                  className={`chat__language-option ${
                    item.code === selectedLanguage
                      ? 'chat__language-option_active'
                      : ''
                  }`}
                  onClick={() => handleLanguageSelect(item.code)}>
                  {item.lang}
                </li>
              ))}
            </ul>
          </div>
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
