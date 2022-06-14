import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { SettingsPage } from './components/SettingsPage';
import CategoryPage from './components/CategoryPage';
import GamePage from './components/GamePage';
import ScorePage from './components/ScorePage';
import ErrorPage from './components/ErrorPage';
import { AppRoute } from './consts/const';

const App: React.FC = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path={AppRoute.Root} element={<HomePage />} />
        <Route path={`${AppRoute.Category}/:catId`} element={<CategoryPage />} />
        <Route path={`${AppRoute.Category}/:catId/:groupId`} element={<GamePage />} />
        <Route path={`${AppRoute.Score}/:catId/:groupId`} element={<ScorePage />} />
        <Route path={AppRoute.Settings} element={<SettingsPage />} />
        <Route path='*' element={<ErrorPage errorMessage='404' />} />
      </Routes>
    </div>
  );
};

export default App;
