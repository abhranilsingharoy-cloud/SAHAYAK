import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'NCW Portal', description: 'National Commission for Women complaint filing portal' }
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
