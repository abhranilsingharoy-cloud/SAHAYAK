import type { Metadata } from 'next'
import './globals.css'
import AppLayoutClient from './components/AppLayoutClient'
import SAATHIBot from './components/ui/SAATHIBot'

export const metadata: Metadata = {
  title: {
    default: 'SAHAYAK-AI | National Helpline Against Atrocities — 14566',
    template: '%s | SAHAYAK-AI'
  },
  description: 'AI-powered trauma triage platform for India\'s NHAA helpline (14566). Real-time SVI scoring, acoustic biomarker analysis, auto e-FIR drafting, and Suraksha Path routing for SC/ST atrocity victims.',
  keywords: ['NHAA 14566', 'SC/ST atrocity helpline', 'e-FIR', 'SAHAYAK', 'trauma triage AI', 'Suraksha Path', 'SIH 2026', 'women safety India', 'legal aid SC/ST'],
  authors: [{ name: 'SAHAYAK-AI Team', url: 'https://github.com/abhranilsingharoy-cloud/SAHAYAK' }],
  creator: 'SAHAYAK-AI Team',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://sahayak-ai.vercel.app',
    siteName: 'SAHAYAK-AI',
    title: 'SAHAYAK-AI — AI Trauma Triage for NHAA 14566',
    description: 'Protecting the vulnerable. Intercepting crisis. In milliseconds.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SAHAYAK-AI Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAHAYAK-AI — AI Trauma Triage for NHAA 14566',
    description: 'AI-powered crisis response for India\'s atrocity helpline',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://sahayak-ai.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppLayoutClient>
          {children}
        </AppLayoutClient>
        <SAATHIBot />
      </body>
    </html>
  )
}
