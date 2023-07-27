import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Header, Footer, Login } from './components';
import { Articles, Favourites, Main } from './pages';
import { useState } from 'react';
import { initialSavedMessages } from './utils';

const App = () => {
  const [savedMessages, setSavedMessages] = useState(initialSavedMessages);

  return (
    <div className='page'>
      <Header />
      <main className='content'>
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
            element={<Favourites savedMessages={savedMessages} />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
