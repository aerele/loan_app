import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Providers from './providers';
import en from '@/messages/en.json';
// import hi from "@/messages/hi.json"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Providers messages={en}>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
