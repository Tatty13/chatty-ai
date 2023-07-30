import React from 'react';
import './Header.css';

import { Nav, Logo } from '../';

const Header = () => {
  return (
    <header className='header'>
      <Logo />
      <Nav />
    </header>
  );
};

export { Header };
