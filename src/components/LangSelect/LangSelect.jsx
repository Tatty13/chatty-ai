import './LangSelect.css';

import languageIcon from '../../assets/icons/clarity_language-line.svg';
import { LangList } from '../';

export const LangSelect = ({
  onIconClick,
  isLangListVisible,
  selectedLanguage,
  handleLanguageSelect,
}) => {
  return (
    <div className='chat__language-select'>
      <img
        className='chat__language-icon'
        src={languageIcon}
        alt='Language Icon'
        onClick={onIconClick}
      />
      <LangList
        selectedLanguage={selectedLanguage}
        onLangItemClick={handleLanguageSelect}
        isVisible={isLangListVisible}
      />
    </div>
  );
};
