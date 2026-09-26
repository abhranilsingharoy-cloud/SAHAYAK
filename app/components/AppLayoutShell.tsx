'use client'
import { usePathname } from 'next/navigation'
import AppLayoutClient from './AppLayoutClient'

export default function AppLayoutShell({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  if (pathname === '/') return <>{children}</>
  return <AppLayoutClient>{children}</AppLayoutClient>
}
