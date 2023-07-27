import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Header, Footer, Login } from './components';
import { Articles, Favorites, Main } from './pages';

const App = () => {
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
            element={<Favorites />}
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
