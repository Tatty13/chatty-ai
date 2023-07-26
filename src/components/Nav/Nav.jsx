import { NavLink } from 'react-router-dom';

import './Nav.css';

export const Nav = () => {
  const handleActiveLink = ({ isActive }) =>
    `link nav__link ${isActive ? 'nav__link_active' : ''}`;

  return (
    <nav className='nav'>
      <ul className='list nav__list'>
        <li>
          <NavLink
            className={handleActiveLink}
            to='/'>
            Main
          </NavLink>
        </li>
        <li>
          <NavLink
            className={handleActiveLink}
            to='/articles'>
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            className={handleActiveLink}
            to='/favorites'>
            Favourites
          </NavLink>
        </li>
        <li>
          <NavLink
            className='link nav__link nav__link_type_auth'
            to='/profile'>
            Hey, Alice
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
