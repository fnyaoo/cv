"use client"

import React from "react"
// import { Globe, GlobeIcon, MailIcon, PhoneIcon } from "lucide-react"
// import { CommandMenu } from "../components/command-menu"
// import { ProjectCard } from "../components/project-card"
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
// import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
// import { Card, CardContent, CardHeader } from "../components/ui/card"
// import { Section } from "../components/ui/section"
import Months from "../data/Months"
import { RESUME_DATA } from "../data/resume-data"
import { UIText } from "../data/UIText"
import { WorkExperienceDate } from "../lib/types"

export type Language = "ru" | "en"

export default function Home() {
  const [language, setLanguage] = React.useState<Language>("en")

  // React.useEffect(() => {
  //   const savedLang = localStorage.getItem("lang")
  //   if (savedLang) {
  //     setLanguage(savedLang as Language)
  //   } else {
  //     const lang = navigator.language === "ru-RU" ? "ru" : "en"
  //     localStorage.setItem("lang", lang)
  //     setLanguage(lang)
  //   }
  // }, [])

  const switchLanguage = () => {
    const newLang = language === "ru" ? "en" : "ru"
    // localStorage.setItem("lang", newLang)
    setLanguage(newLang)
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

    return (
        <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
            <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                        <h1 className="text-2xl font-bold">{RESUME_DATA.name[language]}</h1>
                        <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
                            {RESUME_DATA.about[language]}
                        </p>
                        <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
                            <a
                                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                                href={RESUME_DATA.locationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {/* <GlobeIcon className="size-3" /> */}
                                {RESUME_DATA.location[language]}
                            </a>
                        </p>
                        <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
                            {RESUME_DATA.contact.email ? (
                                <Button
                                    className="size-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`mailto:${RESUME_DATA.contact.email}`}>
                                        <MailIcon className="size-6 text-black" />
                                    </a>
                                </Button>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <Button
                                    className="size-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`tel:${RESUME_DATA.contact.tel}`}>
                                        <PhoneIcon className="size-4" />
                                    </a>
                                </Button>
                            ) : null}
                            {RESUME_DATA.contact.social.map((social) => (
                                <Button
                                    key={social.name}
                                    className="size-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={social.url}>
                                        <social.icon className="size-6" />
                                    </a>
                                </Button>
                            ))}
                        </div>
                        <div
                            className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px]">
                            {RESUME_DATA.contact.email ? (
                                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                                    <span className="underline">{RESUME_DATA.contact.email}</span>
                                </a>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                                    <span className="underline">{RESUME_DATA.contact.tel}</span>
                                </a>
                            ) : null}
                            {RESUME_DATA.contact.social.find(s => s.name === "Telegram") ? (
                                <a href={`${RESUME_DATA.contact.social.find(s => s.name === "Telegram")?.url}`}>
                                    <span className="underline">{RESUME_DATA.contact.social.find(s => s.name === "Telegram")?.url.replace(/(^\w+:|^)\/\//, '')}</span>
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <Avatar className="size-28">
                        <AvatarImage alt={RESUME_DATA.name[language]} src={RESUME_DATA.avatarUrl} />
                        <AvatarFallback>{RESUME_DATA.initials[language]}</AvatarFallback>
                    </Avatar>
                </div>
                <Section>
                    <h2 className="text-xl font-bold">{UIText['about'][language]}</h2>
                    <p className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
                        {RESUME_DATA.summary[language]}
                    </p>
                </Section>
                <Section>
                    <h2 className="text-xl font-bold">{UIText['workExperience'][language]}</h2>
                    {RESUME_DATA.work.map((work) => {
                        return (
                            <Card key={work.company[language]}>
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                                            <a className="hover:underline" href={work.link}>
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
                                <CardContent className="mt-2 text-xs print:text-[10px]">
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
                    {RESUME_DATA.education.map((education) => {
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
                        {RESUME_DATA.skills.map((skill) => {
                            return (
                                <Badge className="print:text-[10px]" key={skill}>
                                    {skill}
                                </Badge>
                            )
                        })}
                    </div>
                </Section>

                {RESUME_DATA.projects.length ? (
                    <Section className="print-force-new-page scroll-mb-16">
                        <h2 className="text-xl font-bold">{UIText['projects'][language]}</h2>
                        <div
                            className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {RESUME_DATA.projects.length > 0 ? (
                                (RESUME_DATA.projects as readonly any[]).map((project: any) => {
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

            {/* <CommandMenu
                links={[
                    {
                        url: RESUME_DATA.personalWebsiteUrl,
                        title: "Personal Website",
                    },
                    ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
                        url: socialMediaLink.url,
                        title: socialMediaLink.name,
                    })),
                ]}
            /> */}


            <Button
                className="fixed language_button font-bold py-2 px-2 rounded-full shadow-lg cursor-pointer print:hidden"
                variant="outline"
                size="icon"
                asChild
                onClick={switchLanguage}
            >
                {/* <Globe className="size-16" /> */}
            </Button>
        </main>
    )
}