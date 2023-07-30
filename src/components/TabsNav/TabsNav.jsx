import React from 'react';
import { Link } from 'react-router-dom';
import './TabsNav.css';

const TabsNav = () => {
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
        <div className='tabs__search'>
            <input className="tabs__text tabs__text_active" type="text" placeholder="" />
            <button type='search' className="tabs__button"></button>
        </div>
      </div>
	)
}

export default TabsNav;