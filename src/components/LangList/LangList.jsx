import './LangList.css';

import { languageList } from './language-list';

export const LangList = ({ selectedLanguage, onLangItemClick, isVisible }) => {
  const langListElems = languageList.map((item, i) => (
    <li
      key={i}
      className={`chat__language-option ${
        item.code === selectedLanguage ? 'chat__language-option_active' : ''
      }`}
      onClick={() => onLangItemClick(item.code)}>
      {item.lang}
    </li>
  ));

  return (
    <ul className={`list chat__language-list ${isVisible ? 'show' : ''}`}>
      {langListElems}
    </ul>
  );
};
