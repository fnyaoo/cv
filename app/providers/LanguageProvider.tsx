"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface LanguageContextProps {
  language: "ru" | "en"
  setLanguage: (lang: "ru" | "en") => void
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<"ru" | "en">("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "ru" | "en" | null
    if (savedLang) {
      setLanguageState(savedLang)
    } else {
      const browserLang = navigator.language.startsWith("ru") ? "ru" : "en"
      setLanguageState(browserLang)
      localStorage.setItem("language", browserLang)
    }
  }, [])

  const setLanguage = (lang: "ru" | "en") => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}


export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
