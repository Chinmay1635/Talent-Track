import type { AppProps } from 'next/app';
import { AuthProvider } from '../src/context/AuthContext';
import { DataProvider } from '../src/context/DataContext';
import '../src/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </AuthProvider>
  );
}