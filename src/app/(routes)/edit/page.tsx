"use client"

import React, { useEffect, useState } from "react"
import json from "@/data/resume-data.json"
import { ResumeData } from '@/src/app/types/types'
import { Button } from '@/src/app/components/ui/button'
import { useLanguage } from '@/src/app/providers/LanguageProvider'
import { UIText } from '@/src/app/lib/UIText'
import { JsonEditor } from '@/src/app/components/JsonEditod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const RESUME_DATA: ResumeData = json

export default function Settings() {
  const { language, setLanguage } = useLanguage()
  const router = useRouter()
  const [jsonData, setJsonData] = useState(RESUME_DATA)
  const [isDirty, setIsDirty] = useState(false)

  const switchLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  const saveJson = async () => {
    if (!isDirty) {
      toast.info(UIText['noChanges'][language])
      return
    }

    const res = await fetch('/api/save-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    })

    if (res.ok) {
      toast.success(UIText['saved'][language])
      setIsDirty(false)
    } else {
      toast.error(UIText['error'][language])
    }
  }

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  // Ctrl+S сохранение
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        saveJson()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDirty, jsonData, language,  saveJson])

  return (
    <main>
      <JsonEditor
        data={RESUME_DATA}
        onChange={(updated) => {
          setJsonData(updated)
          setIsDirty(true)
        }}
      />
      
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
          onClick={saveJson}
          title={UIText['save'][language]}
        >
          <Icon icon={"lineicons:save"} />
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
    </main>
  )
}