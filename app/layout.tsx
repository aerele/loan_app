import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Providers from './providers';
import ErrorStack from '@/components/error/ErrorStack';
import en from '@/messages/en.json';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <Providers messages={en}>
            <ErrorStack />

            {children}
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
