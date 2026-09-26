import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Integration Hub', description: 'Live connectivity with NGOs, ministries, and state police APIs' }
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
