import './Favourites.css';
import searchIcon from '../../assets/icons/search-icon.svg';

import { SavedMessagesList } from '../../components';
import { useState } from 'react';
import { sortOptions } from './sortOptions';

export const Favourites = ({ savedMessages }) => {
  const [activeSortOptionIdx, setActiveSortOptionIdx] = useState(0);
  const [isSortOptionsVisible, setIsSortOptionsVisible] = useState(false);

  const toggleSortOptionsVisibility = () => {
    setIsSortOptionsVisible(!isSortOptionsVisible);
  };

  const handleMessagesSort = (idx) => {
    setActiveSortOptionIdx(idx);
    toggleSortOptionsVisibility();
  };

  const sortList = sortOptions.map((item, i) => (
    <li
      key={i}
      className={`favorites__sort-item ${
        activeSortOptionIdx === i ? 'favorites__sort-item_active' : ''
      }`}
      onClick={() => handleMessagesSort(i)}>
      {item}
    </li>
  ));

  return (
    <section className='section favorites'>
      <form
        className='favorites__form'
        name='favorites'>
        <div className='favorites__sort-wrap'>
          <div
            className='favorites__sort-control'
            onClick={toggleSortOptionsVisibility}>
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
            />
          </div>
          <ul
            className={`list favorites__sort-list ${
              isSortOptionsVisible ? 'favorites__sort-list_visible' : ''
            }`}>
            {sortList}
          </ul>
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
