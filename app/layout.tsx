// layout.tsx - Fully Enhanced SEO + Performance Optimized for Chemifasi.ge
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const GA_MEASUREMENT_ID = 'G-H2YWLMS1WK';

export const metadata: Metadata = {
  metadataBase: new URL('https://chemifasi.ge'),
  title: {
    template: '%s | ჩემი ფასი - შეადარე ფასები პირველზე საქართველოში',
    default: 'ჩემი ფასი - ფასების შედარება | შეადარე ფასები ქართულ ონლაინ მაღაზიებში და იპოვე ყველაზე იაფი პროდუქტი!',
  },
  description: 'იპოვე საუკეთესო ფასები ონლაინ საქართველოში! შეადარე ფასები ტექნიკაზე, მედიკამენტებზე, საყოფაცხოვრებო ნივთებზე, მოდურ პროდუქტებზე და სხვა. ✓ უფასო ✓ მარტივი ✓ სწრაფი ✓ ყოვლისმომცველი',
  keywords: [
    'ფასების შედარება','ონლაინ შოპინგი საქართველო','ტექნიკა ფასები','მედიკამენტების ფასები','საუკეთესო ფასი','ტექნიკის მაღაზიები','ფარმაცია ონლაინ','შესყიდვები თბილისი','ფასდაკლება','ონლაინ ფასდაკლებები','სად ვიყიდო იაფად','დაზოგე ფული','ფასები თბილისში','გადახდა ონლაინ','შოპინგი საქართველოში','ელექტრონიკა','სილამაზის პროდუქტები','მობილური ტელეფონები','ლეპტოპები','კომპიუტერები','ფასდაკლება ტექნიკა','ონლაინ მაღაზიების შედარება','Georgia best price','Tbilisi shopping','compare prices Georgia','e-commerce Georgia','tech deals Georgia','cheap electronics Georgia','Georgian online stores','where to buy cheap','how to find best price'
  ],
  authors: [{ name: 'მიხეილ ჩხვირკია', url: 'https://github.com/MikheiliChkhvirkia' }],
  creator: 'მიხეილ ჩხვირკია',
  publisher: 'ჩემი ფასი',
  formatDetection: { email: false, address: false, telephone: false },
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
    title: 'ჩემი ფასი - შეადარე ფასები პირველზე საქართველოში | ონლაინ მაღაზიების შედარება',
    description: 'იპოვე საუკეთესო ფასები ქართულ ონლაინ მაღაზიებში. დაზოგე ფული და დრო ერთად - მხოლოდ chemifasi.ge-ზე!',
    url: 'https://chemifasi.ge',
    siteName: 'ჩემი ფასი',
    locale: 'ka_GE',
    type: 'website',
    images: [
      {
        url: 'https://chemifasi.ge/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'შეადარე ფასები ონლაინ მაღაზიებში - ჩემი ფასი',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ჩემი ფასი - იპოვე იაფი ფასები | ონლაინ მაღაზიების შედარება',
    description: 'დაზოგე ფული, იპოვე საუკეთესო ფასები ქართულ მაღაზიებში. ყველა პროდუქტი, ყველა ფასი — ერთ საიტზე!',
    creator: '@mikheil_chkhvirkia',
    images: ['https://chemifasi.ge/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'shopping',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="geo.region" content="GE" />
        <meta name="geo.placename" content="Tbilisi, Georgia" />
        <meta name="geo.position" content="41.7151;44.8271" />
        <meta name="ICBM" content="41.7151, 44.8271" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        <link rel="alternate" href="https://chemifasi.ge" hrefLang="ka-GE" />
        <link rel="alternate" href="https://chemifasi.ge" hrefLang="x-default" />

        <link rel="preload" href="/og-image.jpg" as="image" type="image/jpeg" />

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
