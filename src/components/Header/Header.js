import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/icons/logo.svg';
import { Nav } from '../';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <img
          src={logo}
          alt='логотип сайта'
          className='header__logo'
        />
      </Link>
      <Nav />
    </header>
  );
};

export { Header };
