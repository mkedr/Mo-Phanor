import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Lato } from 'next/font/google'
import { PersonSchema, LocalBusinessSchema, WebsiteSchema } from '@/components/json-ld'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const _lato = Lato({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-lato' });

const siteUrl = 'https://mophanor.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mo Phanor - Mortgage Decision Coach',
    template: '%s | Mo Phanor'
  },
  description: 'Helping first-time homebuyers make confident, bias-free mortgage decisions using behavioral economics. Expert mortgage coaching with clarity and confidence.',
  keywords: ['mortgage', 'mortgage coach', 'first-time homebuyer', 'mortgage decisions', 'behavioral economics', 'mortgage advice', 'home buying', 'Mo Phanor'],
  authors: [{ name: 'Mo Phanor' }],
  creator: 'Mo Phanor',
  publisher: 'Mo Phanor',
  generator: 'v0.app',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mo Phanor - Mortgage Decision Coach',
    title: 'Mo Phanor - Mortgage Decision Coach',
    description: 'Helping first-time homebuyers make confident, bias-free mortgage decisions using behavioral economics.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mo Phanor - Mortgage Decision Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mo Phanor - Mortgage Decision Coach',
    description: 'Helping first-time homebuyers make confident, bias-free mortgage decisions using behavioral economics.',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B2545' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <PersonSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
