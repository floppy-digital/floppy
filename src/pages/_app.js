'use client';
import '@/styles/globals.css';
import '@/styles/main.css';
import { Provider } from 'react-redux';
import store from '@/lib/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
