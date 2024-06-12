'use client';
import '@/styles/globals.css';
import '@/styles/main.css';
import { EditorProvider } from '@/lib/contexts/editorContext';
import { MetadataProvider } from '@/lib/contexts/metadataContext';

export default function App({ Component, pageProps }) {
  return (
    <EditorProvider>
      <MetadataProvider>
        <Component {...pageProps} />
      </MetadataProvider>
    </EditorProvider>
  );
}
