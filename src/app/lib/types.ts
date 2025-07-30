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

export interface ResumeData {
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