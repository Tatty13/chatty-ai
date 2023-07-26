import React, { useState, useRef } from 'react';
import languageIcon from '../../assets/icons/clarity_language-line.svg';
import './Chat.css'; // Подключите свои стили

const UserMessageTemplate = () => (
  <div className='chat__message message_user'>
    <p className='chat__message_text'>User message here</p>
    <div className='chat__message_user-logo'></div>
  </div>
);

const BotMessageTemplate = () => (
  <div className='chat__message message_bot'>
    <div className='chat__message_bot-logo'></div>
    <p className='chat__message_text'>Bot message here</p>
  </div>
);

const Chat = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Язык по умолчанию
  const [textValue, setTextValue] = useState('');
  const textareaRef = useRef(null);

  const toggleLanguageSelector = () => {
    setShowLanguageSelector((prevShow) => !prevShow);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false); // Закрыть всплывающий список после выбора языка
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value); // Обновляем состояние textValue при изменении текста в поле ввода
    adjustTextareaHeight(); // Вызываем функцию для автоматического изменения высоты textarea
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Сначала установим высоту textarea на "auto" для сброса размера
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Зададим высоту textarea на основе его содержимого
    }
  };

  return (
    <div className='chat'>
      <div className='chat__messages'>
        <BotMessageTemplate />
        <UserMessageTemplate />
      </div>
      <form className='chat__input-container'>
        <div className='chat__input'>
          <textarea
            ref={textareaRef}
            className='chat__text'
            placeholder='Send a message'
            value={textValue}
            onChange={handleTextChange} // Добавляем обработчик onChange для отслеживания изменений в поле ввода
          />
          <div
            className='chat__language-select'
            onClick={toggleLanguageSelector}>
            <img
              className='chat__language-icon'
              src={languageIcon}
              alt='Language Icon'
            />
            <ul
              className={`chat__language-selector ${
                showLanguageSelector ? 'show' : ''
              }`}>
              <li
                className='chat__language-option'
                onClick={() => handleLanguageSelect('en')}>
                English
              </li>
              <li
                className='chat__language-option'
                onClick={() => handleLanguageSelect('ru')}>
                Russian
              </li>
            </ul>
          </div>
        </div>
        <div className='chat__buttons-block'>
          <button
            type='submit'
            className='chat__submit-btn'
            value=''></button>
        </div>
      </form>
    </div>
  );
};

export { Chat };
