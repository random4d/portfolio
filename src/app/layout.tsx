import { Space_Mono, Saira } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

const saira = Saira({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-menu', // Keeping name for compatibility, effectively Saira
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My detailed portfolio site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${spaceMono.variable} ${saira.variable}`}>
      <body>
        <div className="background-layer" />
        <Header />
        {children}
      </body>
    </html>
  );
}
