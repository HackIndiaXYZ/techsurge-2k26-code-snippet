import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap' 
});

export const metadata: Metadata = {
  title: 'PMFBY / RWBCIS - Pradhan Mantri Fasal Bima Yojana Portal',
  description: 'Authentication architecture & passwordless demo auth system for Crop Insurance Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.className} montserrat-main font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

