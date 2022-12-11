import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import filter from 'leo-profanity';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './App.jsx';

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      debug: false,
      resources,
    });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));

  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </React.StrictMode>,
  );
};
