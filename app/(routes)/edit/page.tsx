"use client"

import React, { useEffect, useState } from "react"

import json from "../../data/resume-data.json"
import { ResumeData } from '@/app/types/types'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { UIText } from '@/lib/UIText'
import { JsonEditor } from '@/components/JsonEditod'


const RESUME_DATA: ResumeData = json

export default function Settings() {
  const { language, setLanguage } = useLanguage()

  const switchLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  const [jsonData, setJsonData] = useState(RESUME_DATA)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = '' // обязательное для Chrome
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  return (
    <main className=" ">
      <JsonEditor
        data={RESUME_DATA}
        onChange={(updated) => {
          console.log(updated);
          
        }}
      />


      <Button
        className="fixed bottom-4 right-4 font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
        variant="outline"
        asChild
        onClick={switchLanguage}
        title={UIText['translate'][language]}
      >
        <span>{language === 'ru' ? 'EN' : 'RU'}</span>
      </Button>
      
      <Button
        className="fixed bottom-4 right-20 font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
        variant="outline"
        onClick={() => {
          // сохранить jsonData в файл
          const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'resume-data.json'
          a.click()
          URL.revokeObjectURL(url)
          setIsDirty(false)
        }}
        title="Сохранить"
      >
        <span>💾</span>
      </Button>


    </main>
  )
}