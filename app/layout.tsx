import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Script from 'next/script';

// Configure Inter font with preload
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

// GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-H2YWLMS1WK';

export const metadata: Metadata = {
  metadataBase: new URL('https://chemifasi.ge'),
  title: {
    template: '%s | ჩემი ფასი - ფასების შედარება',
    default: 'ჩემი ფასი - ფასების შედარება | ონლაინ მაღაზიების ფასების შედარება',
  },
  description: 'შეადარეთ პროდუქტების ფასები ქართულ ონლაინ მაღაზიებში. იპოვეთ საუკეთესო ფასები ელექტრონიკაზე, საყოფაცხოვრებო ნივთებზე და სხვა. ✓ უფასო ✓ მარტივი ✓ სწრაფი',
  keywords: [
    'ფასების შედარება',
    'ონლაინ მაღაზია',
    'საქართველო',
    'ელექტრონიკა',
    'ფარმაცია',
    'იაფი ფასები',
    'ფასდაკლება',
    'აქცია',
    'ზუმერი',
    'ალტა',
    'ტექნიკის მაღაზია',
    'ტელეფონები',
    'ლეპტოპები',
    'კომპიუტერები',
    'საყოფაცხოვრებო ტექნიკა',
    'fasebis shedareba',
    'online magazia',
    'saqartvelo',
    'elektronika',
    'farmacia',
    'iafi fasebi',
    'fasdakleba',
    'aqcia',
    'zoomer',
    'alta',
    'teqnikis magazia',
    'telefonebi',
    'laptopi',
    'kompiuterebi',
    'sayofacxovrebo teqnika',
    'price comparison georgia',
    'georgian online shops',
    'electronics georgia',
    'tbilisi shopping',
  ],
  authors: [{ name: 'მიხეილ ჩხვირკია', url: 'https://github.com/MikheiliChkhvirkia' }],
  creator: 'მიხეილ ჩხვირკია',
  publisher: 'ჩემი ფასი',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'ka-GE': '/ka',
      'x-default': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'ჩემი ფასი - ფასების შედარება | ონლაინ მაღაზიების ფასების შედარება',
    description: 'შეადარეთ პროდუქტების ფასები ქართულ ონლაინ მაღაზიებში. იპოვეთ საუკეთესო ფასები ონლაინ მაღაზიებში!',
    url: 'https://chemifasi.ge',
    siteName: 'ჩემი ფასი',
    locale: 'ka_GE',
    type: 'website',
    images: [
      {
        url: 'https://chemifasi.ge/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ჩემი ფასი - ფასების შედარება',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ჩემი ფასი - ფასების შედარება | ონლაინ მაღაზიების ფასების შედარება',
    description: 'შეადარეთ პროდუქტების ფასები ქართულ ონლაინ მაღაზიებში.',
    creator: '@mikheil_chkhvirkia',
    images: ['https://chemifasi.ge/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'shopping',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={inter.className}>
      <head>
        {/* SEO alternate links */}
        <link rel="alternate" href="https://chemifasi.ge" hrefLang="ka-GE" />
        <link rel="alternate" href="https://chemifasi.ge" hrefLang="x-default" />

        {/* Geo Tags */}
        <meta name="geo.region" content="GE" />
        <meta name="geo.placename" content="Georgia" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="https://chemifasi.ge/og-image.jpg"
          as="image"
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Schema.org Structured Data */}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ჩემი ფასი",
              "alternateName": "Chemi Fasi",
              "url": "https://chemifasi.ge",
              "description": "ქართული ონლაინ მაღაზიების ფასების შედარების პლატფორმა",
              "inLanguage": "ka",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://chemifasi.ge/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}