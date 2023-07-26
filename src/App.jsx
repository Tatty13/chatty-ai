import React from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Articles from './components/Articles/Articles';
import Favorites from './components/Favorites/Favorites';
import Login from './components/Login/Login';


const App = () => {
  return (
    <div className='root'>
        <div className='page'>
            <Header />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/articles' element={<Articles />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/login' element={<Login />} /> 
            </Routes>
            <Footer />
        </div>
    </div>   
  );
};

export default App;
