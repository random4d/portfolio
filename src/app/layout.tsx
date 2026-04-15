import { Inter, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Ayumi Nagai',
  description: 'Creative Developer / Media Artist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <div className="background-layer" />
        <Header />
        {children}
      </body>
    </html>
  );
}
