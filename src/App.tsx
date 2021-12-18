import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
