import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.scss'

const App: React.FC = () => {

  return (
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
  );
}

export default App;
