import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/icons/logo.svg";

const Header = () => {
  return (
    <header className='header'>
      <Link to="/">
        <img src={logo} alt="логотип сайта" className="header__logo" />
      </Link>
      <nav className='header__menu'>
        <Link className='header__link' to='/'>Main</Link>
        <Link className='header__link' to='/articles'>Articles</Link>
        <Link className='header__link' to='/favorites'>Favorites</Link>
        <Link className='header__link header__link_auth' to='/login'>Hey, Alice</Link>
      </nav>
    </header>
  );
};

export default Header;