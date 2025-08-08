"use client"

import React, { useState, useEffect } from "react"
import Months from "./lib/Months"
import { UIText } from "./lib/UIText"

import { Button } from '@/src/app/components/ui/button'
import { Section } from '@/src/app/components/section'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/app/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/src/app/components/ui/card'
import { Badge } from '@/src/app/components/ui/badge'
import { ResumeData, WorkExperienceDate } from '@/src/app/types/types'
import { ProjectCard } from '@/src/app/components/project-card'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useLanguage } from './providers/LanguageProvider'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loader } from './components/loader'

export type Language = "ru" | "en"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const { language, setLanguage } = useLanguage()

  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/get-resume')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setResumeData(data)
        document.title = `${data.name[language]}`
      } catch (err) {
        console.error('Error fetching resume data:', err)
        setError('Failed to load resume data')
      } finally {
        setLoading(false)
      }
    }

    fetchResumeData()
  }, [])


  const switchLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru')
  }

  const calculateWorkTime = (start: WorkExperienceDate, end: WorkExperienceDate | null): string => {
    const currentDate = end || { month: new Date().getMonth() + 1, year: new Date().getFullYear() }
    let totalYears = currentDate.year - start.year
    let totalMonths = currentDate.month - start.month
    if (totalMonths < 0) {
      totalYears -= 1
      totalMonths += 12
    }
    const yearLabel = language === "en"
      ? totalYears === 1 ? "year" : "years"
      : totalYears === 1 ? "год" : totalYears > 1 && totalYears < 5 ? "года" : "лет"
    const monthLabel = language === "en"
      ? totalMonths === 1 ? "month" : "months"
      : totalMonths === 1 ? "месяц" : totalMonths > 1 && totalMonths < 5 ? "месяца" : "месяцев"
    const conjunction = language === "en" ? "and" : "и"
    if (totalMonths === 0) return `${totalYears} ${yearLabel}`
    return `${totalYears} ${yearLabel} ${conjunction} ${totalMonths} ${monthLabel}`
  }


  if (loading) {
    return <Loader message="" fullScreen />
  }

  if (error || !resumeData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4"> =( </p>
        </div>
      </main>
    )
  }

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{resumeData.name[language]}</h1>
            <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
              {resumeData.about[language]}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={resumeData.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resumeData.location[language]}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              {resumeData.contact.email ? (
                <Button
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`mailto:${resumeData.contact.email}`}>
                    <Icon icon="lineicons:envelope" />
                  </a>
                </Button>
              ) : null}
              {resumeData.contact.tel ? (
                <Button
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`tel:${resumeData.contact.tel}`}>
                    {/* <PhoneIcon className="size-4" /> */}
                  </a>
                </Button>
              ) : null}
              {resumeData.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url} target='_blank'>
                    <Icon icon={social.icon} />
                  </a>
                </Button>
              ))}
            </div>
            <div
              className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px]">
              {resumeData.contact.email ? (
                <a href={`mailto:${resumeData.contact.email}`}>
                  <span className="underline">{resumeData.contact.email}</span>
                </a>
              ) : null}
              {resumeData.contact.tel ? (
                <a href={`tel:${resumeData.contact.tel}`}>
                  <span className="underline">{resumeData.contact.tel}</span>
                </a>
              ) : null}
              {resumeData.contact.social.find(s => s.name === "Telegram") ? (
                <a href={`${resumeData.contact.social.find(s => s.name === "Telegram")?.url}`}>
                  <span className="underline">{resumeData.contact.social.find(s => s.name === "Telegram")?.url.replace(/(^\w+:|^)\/\//, '')}</span>
                </a>
              ) : null}
            </div>
          </div>

          <Avatar className="size-28 rounded-xl">
            <AvatarImage alt={resumeData.name[language]} src={resumeData.avatarUrl} />
            <AvatarFallback>{resumeData.initials[language]}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">{UIText['about'][language]}</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
            {resumeData.summary[language]}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold">{UIText['workExperience'][language]}</h2>
          {resumeData.work.map((work) => {
            return (
              <Card key={work.company[language]}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a
                        className="hover:underline"
                        href={work.link}
                        target='_blank'
                      >
                        {work.company[language]}
                      </a>

                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {Months[work.start.month][language]} {work.start.year} - {work.end ? `${Months[work.end.month][language]} ${work.end.year}` : UIText['workTime'][language]} • {calculateWorkTime(work.start, work.end)}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm leading-none print:text-[12px]">
                    {work.title[language]}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 text-xs print:text-[10px] text-gray-500">
                  {work.description[language]}
                  {work.responsibilities.length > 0 ? (
                    <ul className="mt-2 list-disc list-inside">
                      {work.responsibilities.map((item, index) => (
                        <li key={index}>
                          {item[language]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">{UIText['education'][language]}</h2>
          {resumeData.education.map((education) => {
            return (
              <Card key={education.school[language]}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">
                      {education.school[language]}
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 print:text-[12px]">
                  {education.degree[language]}
                </CardContent>
              </Card>
            )
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">{UIText['skills'][language]}</h2>
          <div className="flex flex-wrap gap-1">
            {resumeData.skills.map((skill) => {
              return (
                <Badge variant="secondary" className="print:text-[10px]" key={skill}>
                  {skill}
                </Badge>
              )
            })}
          </div>
        </Section>

        {resumeData.projects.length ? (
          <Section className="scroll-mb-16 break-inside-avoid">
            <h2 className="text-xl font-bold">{UIText['projects'][language]}</h2>
            <div
              className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
              {resumeData.projects.length > 0 ? (
                (resumeData.projects as readonly any[]).map((project: any) => {
                  return (
                    <ProjectCard
                      key={project?.title ?? ""}
                      title={project?.title ?? ""}
                      description={project?.description[language] ?? ''}
                      tags={project?.techStack ?? []}
                      link={project?.link?.href}
                    />
                  )
                })
              ) : null}
            </div>
          </Section>
        ) : null}
      </section>

      <div className="fixed bottom-4 right-4 flex flex-col gap-4">

        {session ?
          <Button
            className=" font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
            variant="outline"
            onClick={() => router.push('/edit')}
            title={UIText['edit'][language]}
          >
            <Icon icon={"lineicons:pencil-alt"} />
          </Button>
          : ''}


        <Button
          onClick={() => window.print()}
          className="font-bold w-13 h-13 rounded-full shadow-lg cursor-pointer print:hidden z-50"
          variant="outline"
          title={UIText['print'][language]}
        >
          <Icon icon="bi:printer" />

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