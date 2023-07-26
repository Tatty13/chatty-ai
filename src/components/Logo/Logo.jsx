import { Link } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import './Logo.css';

export const Logo = () => {
  return (
    <Link
      to='/'
      className='logo'>
      <img
        src={logo}
        alt='логотип сайта'
        className='logo__img'
      />
    </Link>
  );
};
