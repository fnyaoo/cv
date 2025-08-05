import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Metadata } from 'next'

import json from "./data/resume-data.json"
import { ResumeData } from '@/app/types/types'
import { LanguageProvider } from './providers/LanguageProvider'
const RESUME_DATA: ResumeData = json

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: RESUME_DATA.name.en,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html >
  )
}
