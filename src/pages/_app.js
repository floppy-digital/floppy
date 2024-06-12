'use client';
import '@/styles/globals.css';
import '@/styles/main.css';
import { EditorProvider } from '@/lib/contexts/editorContext';

export default function App({ Component, pageProps }) {
  return (
    <EditorProvider>
      <Component {...pageProps} />
    </EditorProvider>
  );
}
