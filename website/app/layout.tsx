import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "cropins' | Modern Crop Insurance Portal",
  description: "Modern crop insurance platform for farmers and department officers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.className} montserrat-main font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

