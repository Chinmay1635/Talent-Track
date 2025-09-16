import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { AuthProvider } from '../src/context/AuthContext';
import { DataProvider } from '../src/context/DataContext';
import '../src/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}