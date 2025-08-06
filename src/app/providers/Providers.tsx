'use client'

import { SessionProvider } from "next-auth/react"
import { ToastProvider } from './ToastProvider'
import { LanguageProvider } from './LanguageProvider'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ToastProvider>
    </SessionProvider>
  )
}
