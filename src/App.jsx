import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Header, Footer, Login } from './components';
import { Articles, Favorites, Main } from './pages';

const App = () => {
  return (
    <div className='root'>
      <div className='page'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Main />}
          />
          <Route
            path='/articles'
            element={<Articles />}
          />
          <Route
            path='/favorites'
            element={<Favorites />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
