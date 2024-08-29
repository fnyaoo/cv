import {Tretyakov, photo} from "../images/";
import {GitHubIcon, TelegramIcon} from "../components/icons";
import React from "react";

interface LocalizedString {
    ru: string;
    en: string;

    [key: string]: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Education {
    school: LocalizedString;
    degree: LocalizedString;
    start: string;
    end: string;
}

interface WorkExperience {
    company: LocalizedString;
    link: string;
    badges: string[];
    title: LocalizedString;
    logo: string;
    start: string;
    end: string | null;
    description: LocalizedString;
}

interface ProjectLink {
    label: string,
    href: string
}

interface Project {
    title: string;
    techStack: string[];
    description: LocalizedString;
    logo: string;
    link: ProjectLink;
}

interface ResumeData {
    name: LocalizedString;
    initials: LocalizedString;
    location: LocalizedString;
    locationLink: string;
    about: LocalizedString;
    summary: LocalizedString;
    avatarUrl: string;
    personalWebsiteUrl: string;
    contact: {
        email: string;
        tel: string;
        social: SocialLink[];
    };
    education: Education[];
    work: WorkExperience[];
    skills: string[];
    projects: Project[];
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
        ru: "Фулстак разработчик с упором на бекэнд, создавал всякие проекты на Node.js, различных ботов для Telegram и Discord. Соблюдаю дедлайны, дружу с коллективом, открыт к критике. В основном работаю на TypeScript, Node.js.",
        en: "Fullstack developer with a focus on backend, created all sorts of projects on Node.js, various bots for Telegram and Discord. I respect deadlines, am friendly with the team, open to criticism. I mainly work in TypeScript, Node.js.",
    },
    avatarUrl: photo,
    personalWebsiteUrl: "https://fnyaoo.com",
    contact: {
        email: "fnyaoo@gmail.com",
        tel: "",
        social: [
            {
                name: "Telegram",
                url: "https://t.me/fnyaoo",
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
            start: "2022",
            end: null,
            description: {
                ru: "Разработка Музейной Информационной системы. Миграция данных. Разработка Telegram ботов для внутреннего использования. Настройка CI/CD.",
                en: "Development of the Museum Information System. Data migration. Development of Telegram bots for internal use. CI/CD setup.",
            },
        },
    ],
    skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Nginx",
        "Git",
        "Oracle SQL",
        "MySQL",
        "Linux",
        "Docker",
        "PHP",
        "HTML/CSS",
        "Prisma",
        "Python",
        "Nest.js",
        "CI/CD",
    ],
    projects: [
        {
            title: "Sync Sound",
            techStack: ["TypeScript", "Node.js", "Nest.js", "React", "Spotify API", "YandexMusic API", "SoundCloud API"],
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
};