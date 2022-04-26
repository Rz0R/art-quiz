import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import CategoryPage from './pages/CategoryPage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';

import './scss/App.scss';

const App: React.FC = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/category/:catId' element={<CategoryPage />} />
        <Route path='/category/:catId/:groupId' element={<GamePage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
