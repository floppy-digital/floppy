'use client';
import '@/styles/globals.css';
import '@/styles/main.css';
import '@/styles/fonts.css';
import { EditorProvider } from '@/lib/contexts/editorContext';
import { MetadataProvider } from '@/lib/contexts/metadataContext';
import { UserProvider } from '@/lib/contexts/userContext';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <EditorProvider>
        <MetadataProvider>
          <Component {...pageProps} />
        </MetadataProvider>
      </EditorProvider>
    </UserProvider>
  );
}
