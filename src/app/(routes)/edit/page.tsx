"use client"

import React, { useCallback, useEffect, useState } from "react"
import { ResumeData } from '@/src/app/types/types'
import { Button } from '@/src/app/components/ui/button'
import { useLanguage } from '@/src/app/providers/LanguageProvider'
import { UIText } from '@/src/app/lib/UIText'
import { JsonEditor } from '@/src/app/components/JsonEditor'
import { Icon } from '@iconify/react/dist/iconify.js'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader } from '@/src/app/components/loader'


export default function Settings() {
  const { language, setLanguage } = useLanguage()
  const router = useRouter()
  const [jsonData, setJsonData] = useState<ResumeData | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const switchLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  const fetchResume = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/get-resume')

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setJsonData(data)
      document.title = `${data.name[language]}`
    } catch (err) {
      console.error('Error fetching resume:', err)
      toast.error(UIText['error'][language])
    } finally {
      setLoading(false)
    }
  }

  const saveJson = async () => {
    if (!isDirty || !jsonData) {
      toast.info(UIText['noChanges'][language])
      return
    }

    try {
      setSaving(true)
      const res = await fetch('/api/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      toast.success(UIText['saved'][language])
      setIsDirty(false)
    } catch (err) {
      console.error('Error saving resume:', err)
      toast.error(UIText['error'][language])
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchResume()
  }, [])

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        saveJson()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDirty, jsonData, language])

  const handleHomeClick = useCallback(() => {
    if (isDirty) {
      const confirmLeave = window.confirm(UIText['unsavedConfirm'][language])
      if (!confirmLeave) return
    }
    router.push('/')
  }, [isDirty, language, router])


  if (loading) {
    return <Loader message="" fullScreen />
  }

  if (!jsonData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4"> =( </p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <JsonEditor
        data={jsonData}
        onChange={(updated) => {
          setJsonData(updated)
          setIsDirty(true)
        }}
      />

      <div className="fixed bottom-4 right-4 flex flex-col gap-4">
        <Button
          className="font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
          variant="outline"
          onClick={handleHomeClick}
          title={UIText['home'][language]}
        >
          <Icon icon={"lineicons:home"} />
        </Button>

        <Button
          className="font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
          variant="outline"
          onClick={saveJson}
          disabled={saving || !isDirty}
          title={UIText['save'][language]}
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          ) : (
            <Icon icon={"lineicons:save"} />
          )}
        </Button>

        <Button
          className="font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
          variant="outline"
          onClick={switchLanguage}
          title={UIText['translate'][language]}
        >
          <span>{language === 'ru' ? 'EN' : 'RU'}</span>
        </Button>
      </div>
    </main>
  )
}