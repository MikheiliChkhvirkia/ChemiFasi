import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ფასების შედარება | ჩემი ფასი',
  description: 'შეადარეთ პროდუქტების ფასები ქართულ ონლაინ მაღაზიებში',
  keywords: 'ფასების შედარება, ონლაინ მაღაზია, საქართველო, ელექტრონიკა, ფარმაცია',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}