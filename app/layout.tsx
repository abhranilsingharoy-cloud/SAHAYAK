import type { Metadata } from 'next'
import './globals.css'
import AppLayoutClient from './components/AppLayoutClient'
import SAATHIBot from './components/ui/SAATHIBot'

export const metadata: Metadata = {
  title: 'SAHAYAK-AI | National Helpline Against Atrocities (14566)',
  description: 'AI-Enabled Real-Time Stress and Trauma Assessment Module',
}

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
