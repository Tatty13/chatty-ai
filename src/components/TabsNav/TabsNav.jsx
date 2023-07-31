import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './TabsNav.css';

const TabsNav = () => {

	const handleSearch = (searchTerm) => {
		
		  console.log('Результаты поиска:',  searchTerm);
	 };

	return(
		<div className='tabs'>
        <nav className='tabs__nav'>
            <ul className='tabs__list'>
              <li className='tabs__li'>
                <Link className='tabs__link' to="/tab1">Portfolio & Practical experience</Link>
              </li>
              <li className='tabs__li'>
                <Link className='tabs__link' to="/tab2">Skills & Tools</Link>
              </li>
              <li className='tabs__li'>
                <Link className='tabs__link' to="/tab3">Trends & Research</Link>
              </li>
              <li className='tabs__li'>
                <Link className='tabs__link' to="/tab4">Interviews & Career</Link>
              </li>
            </ul>
        </nav>
        <SearchBar onSearch={handleSearch}/>
      </div>
	)
}

export default TabsNav;