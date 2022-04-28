import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loadQuizDataAction } from './store/serviceActions';

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(loadQuizDataAction());

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
