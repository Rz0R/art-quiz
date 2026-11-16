import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/rootReducer';
import { Language, LoadingStatus } from './consts/const';
import { saveSettingsAction } from './store/serviceActions';
import questions from '../public/data/RU_images.json';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function renderApp(path = '/') {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

describe('application after dependency upgrades', () => {
  it('navigates from the home page and loads category images through a Redux thunk', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => questions }));
    renderApp();
    const user = userEvent.setup();
    expect(screen.getByRole('link', { name: /pictures quiz/ })).toHaveAttribute('href', '/category/paintings');
    await user.click(screen.getByRole('link', { name: /artists quiz/ }));
    expect(await screen.findByText('категории')).toBeInTheDocument();
    expect(store.getState().CATEGORY.loadingStatus).toBe(LoadingStatus.SUCCEEDED);
    expect(store.getState().CATEGORY.images).toHaveLength(12);
  });

  it('opens a quiz directly and loads ten questions with four possible authors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => questions }));
    renderApp('/category/artists/1');
    expect(await screen.findByText('Кто автор этой картины?')).toBeInTheDocument();
    expect(store.getState().GAME.questions).toHaveLength(10);
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(4);
  });

  it('persists settings through the updated Redux middleware', () => {
    const settings = { isVolumeOn: false, volumeLevel: 0.5, isTimerOn: true, time: 30, language: Language.EN };
    store.dispatch(saveSettingsAction(settings));
    expect(store.getState().SETTINGS).toMatchObject(settings);
    expect(JSON.parse(localStorage.getItem('settings') || '{}')).toEqual(settings);
  });
});
