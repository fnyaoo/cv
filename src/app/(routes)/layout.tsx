// app/layout.tsx
// import Menu from '@/_components/Menu'
// import { MediaProvider } from '@/_contexts/MediaContext'
// import { SettingsProvider } from '@/_providers/SettingsProvider'
// import { ToastProvider } from '@/_providers/ToastProvider'
// import { authOptions } from '@/api/auth/auth'
// import { getServerSession } from 'next-auth'
import { LanguageProvider } from '../providers/LanguageProvider'
import './globals.css'
import './App.css'

export const metadata = { title: '⠀' }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>

          {/* {session && <Menu />}
          <div className={session ? 'pt-8' : ''}>
            <main className={`flex ${session ? 'h-[calc(100vh-2rem)]' : 'h-[100vh]'} bg-gray-100 text-black relative`}>
              {children}
            </main>
          </div> */}

          <main className={`flex h-[100vh] bg-gray-100 text-black relative`}>
            {children}
          </main>

        </LanguageProvider>
      </body>
    </html>
  )
}
