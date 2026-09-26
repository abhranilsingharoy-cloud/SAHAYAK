import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Crisis Console', description: 'Live NHAA call monitoring, SVI scoring, and operator triage interface' }
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
