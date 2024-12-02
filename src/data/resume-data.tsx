import React from "react"
import { GitHubIcon, TelegramIcon } from "../components/icons"
import { Tretyakov, photo } from "../images/"

interface LocalizedString {
    ru: string
    en: string

    [key: string]: string
}

interface SocialLink {
    name: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface Education {
    school: LocalizedString
    degree: LocalizedString
    start: string
    end: string
}

interface WorkExperience {
    company: LocalizedString
    link: string
    badges: string[]
    title: LocalizedString
    logo: string
    start: WorkExperienceDate
    end: WorkExperienceDate | null
    description: LocalizedString
    responsibilities: LocalizedString[]
}

export interface WorkExperienceDate {
    month: number
    year: number
}

interface ProjectLink {
    label: string,
    href: string
}

interface Project {
    title: string
    techStack: string[]
    description: LocalizedString
    logo: string
    link: ProjectLink
}

interface ResumeData {
    name: LocalizedString
    initials: LocalizedString
    location: LocalizedString
    locationLink: string
    about: LocalizedString
    summary: LocalizedString
    avatarUrl: string
    personalWebsiteUrl: string
    contact: {
        email: string
        tel: string
        social: SocialLink[]
    }
    education: Education[]
    work: WorkExperience[]
    skills: string[]
    projects: Project[]
}

export const RESUME_DATA: ResumeData = {
    name: {
        ru: "Ефлюков Михаил",
        en: "Mikhail Efliukov",
    },
    initials: {
        ru: "EM",
        en: "ME",
    },
    location: {
        ru: "Москва, Россия",
        en: "Moscow, Russia",
    },
    locationLink: "https://www.google.com/maps/place/moscow",
    about: {
        ru: "Full Stack разработчик",
        en: "Full Stack Developer",
    },
    summary: {
        ru: "Фулстак разработчик с упором на бекэнд, создавал всякие проекты на Typescript, различных ботов для Telegram и Discord. Соблюдаю дедлайны, дружу с коллективом, открыт к критике.",
        en: "Fullstack developer with a focus on backend, created all sorts of projects on Typescript, various bots for Telegram and Discord. I respect deadlines, am friendly with the team, open to criticism.",
    },
    avatarUrl: photo,
    personalWebsiteUrl: "https://fnyaoo.com",
    contact: {
        email: "fnyaoo@gmail.com",
        tel: "",
        social: [
            {
                name: "Telegram",
                url: "https://t.me/efliukov",
                icon: TelegramIcon,
            },
            {
                name: "GitHub",
                url: "https://github.com/fnyaoo",
                icon: GitHubIcon,
            },
        ],
    },
    education: [
        {
            school: {
                ru: "Ульяновский государственный университет",
                en: "Ulyanovsk State University",
            },
            degree: {
                ru: "Прикладная информатика",
                en: "Applied Computer Science",
            },
            start: "2017",
            end: "2021",
        },
    ],
    work: [
        {
            company: {
                ru: "Третьяковская галерея",
                en: "Tretyakov Gallery",
            },
            link: "https://www.tretyakovgallery.ru/",
            badges: [],
            title: {
                ru: "Full Stack разработчик",
                en: "Full Stack Developer",
            },
            logo: Tretyakov,
            start: {
                month: 5,
                year: 2022
            },
            end: null,
            description: {
                ru: "Российский государственный художественный музей.",
                en: "State Russian Museum."
            },
            responsibilities: [
                {
                    ru: "Разработка Музейной Информационной Системы (МИС), разработка отдельных новых модулей и доработка уже имеющихся. Система для создания пропусков. Доработка и поддержка публичного сайта с информацией об МИС. Работа с документами, создание шаблонов для быстрого формирования документов.",
                    en: "Development of the Museum Information System (MIS), development of new modules and improvement of existing ones. A system for creating passes. Enhancing and maintaining the public website with information about the MIS. Working with documents, creating templates for quick document generation."
                },
                {
                    ru: "Миграция баз данных.",
                    en: "Database migration."
                },
                {
                    ru: "Разработка Telegram ботов для внутреннего пользования: для создания QR кодов, для связи с Gitea, сокращатель ссылок.",
                    en: "Development of Telegram bots for internal use: for creating QR codes, connecting to Gitea, and link shortening."
                },
                {
                    ru: "Полноценная настройка CI/CD, сначала с помощью вебхуков, потом с помощью Gitea Actions, всё это привязано к Telegram боту для уведомлений о внесении изменений в репозиторий/информация об успехах пайплайнов.",
                    en: "Full CI/CD setup, initially using webhooks, then using Gitea Actions, all integrated with a Telegram bot for notifications about repository changes and pipeline success information."
                },
                {
                    ru: "Настройка серверов для различных проектов.",
                    en: "Server setup for various projects."
                },
            ]
        },
    ],
    skills: [
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Nginx",
        "Git",
        "Oracle SQL",
        "MySQL",
        "MongoDB",
        "Supabase",
        "Linux",
        "Docker",
        "Docker compose",
        "PHP",
        "HTML/CSS",
        "Prisma",
        "Python",
        "Nest.js",
        "React",
        "Next.js",
        "CI/CD",
        "Github Actions",
        "DevOps",
        "Bun",
        "Webpack"
    ],
    projects: [
        {
            title: "Sync Sound",
            techStack: ["TypeScript", "Node.js", "Next.js", "Spotify API", "YandexMusic API", "OAuth"],
            description: {
                ru: "Перенос музыки из разных сервисов в Spotify",
                en: "Transfer your music to Spotify",
            },
            logo: "",
            link: {
                label: "",
                href: "https://fnyaoo.com/syncsound",
            },
        },
    ],
}