import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>Your Logo</div>
      <nav className='header__menu'>
        <Link className='header__link' to='/'>Main</Link>
        <Link className='header__link' to='/articles'>Articles</Link>
        <Link className='header__link' to='/favorites'>Favorites</Link>
        <Link className='header__link' to='/login'>Login</Link>
      </nav>
    </header>
  );
};

export default Header;