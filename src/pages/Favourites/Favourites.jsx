import './Favourites.css';
import searchIcon from '../../assets/icons/search-icon.svg';

import { SavedMessagesList } from '../../components';
import { useState } from 'react';
import { sortOptions } from './sortOptions';

export const Favourites = ({ savedMessages }) => {
  const [activeSortOptionIdx, setActiveSortOptionIdx] = useState(0);

  const handleMessagesSort = () => {};

  return (
    <section className='section favorites'>
      <form
        className='favorites__form'
        name='favorites'>
        <div className='favorites__sort-wrap'>
          <p className='favorites__sort-text'>
            Sort:
            <span className='favorites__sort-accent'>
              {' '}
              {sortOptions[activeSortOptionIdx]}
            </span>
          </p>
          <button
            type='button'
            aria-label='sort'
            className='btn favorites__sort-btn'
            onClick={handleMessagesSort}
          />
        </div>
        <div className='favorites__search-wrap'>
          <input
            className='favorites__search-input'
            type='text'
            placeholder='Search'
          />
        </div>
        <button
          type='submit'
          className='btn favorites__search-btn'>
          <img
            className='favorites__search-icon'
            src={searchIcon}
            alt='search'
          />
        </button>
      </form>
      <SavedMessagesList savedMessages={savedMessages} />
    </section>
  );
};
