import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        Chatty AI&copy; {currentYear} All rights reserved. Terms of services
        and Privacy policy
      </p>
    </footer>
  );
};

export { Footer };
