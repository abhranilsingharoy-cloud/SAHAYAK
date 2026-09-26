import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'SVI Telemetry', description: 'Real-time acoustic biomarker analysis and vulnerability indexing' }
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
