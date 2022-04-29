import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './store/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loadQuizDataAction } from './store/serviceActions';

const store = setupStore();

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
