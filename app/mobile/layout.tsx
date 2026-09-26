import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Mobile Panic', description: 'Silent SOS, IVRS panic system, and WhatsApp emergency integration' }
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
