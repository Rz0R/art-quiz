import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import CategoryPage from './components/CategoryPage';
import GamePage from './components/GamePage';
import NotFoundPage from './components/NotFoundPage';

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
