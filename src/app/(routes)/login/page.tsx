"use client"

import { signIn } from "next-auth/react"
import { Button } from '@/src/app/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { UIText } from '@/src/app/lib/UIText'
import { useLanguage } from '@/src/app/providers/LanguageProvider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const switchLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  return (
    <div className="flex h-screen items-center justify-center">

      <Button
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
        onClick={() => signIn("github")}
      >
        <Icon icon="bi:github" /> {UIText['signIn'][language]}
      </Button>

      <div className="fixed bottom-4 right-4 flex flex-col gap-4">
        <Button
          className=" font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
          variant="outline"
          onClick={() => router.push('/')}
          title={UIText['home'][language]}
        >
          <Icon icon={"lineicons:home"} />
        </Button>

        <Button
          className="font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
          variant="outline"
          asChild
          onClick={switchLanguage}
          title={UIText['translate'][language]}
        >
          <span>{language === 'ru' ? 'EN' : 'RU'}</span>
        </Button>
      </div>
    </div>
  )
}
