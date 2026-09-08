/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — this is the only file you need to edit
 *  to change what the site says. Everything else is layout.
 * ─────────────────────────────────────────────────────────────
 */

import type { IconName } from '../components/Icon.astro';
import { CAREER_START } from '../lib/experience';

/**
 * One place for where I am. It shows up in the about table, the portrait
 * caption, the contact list and the structured data — four copies that used
 * to be edited by hand and could drift apart.
 */
const LOCATION = { city: 'Marburg', country: 'Germany', countryCode: 'DE' } as const;
const LOCATION_LABEL = `${LOCATION.city}, ${LOCATION.country}`;

const EMAIL = 'fazlolahiali@gmail.com';
const CV_FILE = '/Ali-Fazlollahi-Resume.pdf';

export interface NavItem {
  /** must match the section's DOM id */
  id: string;
  label: string;
  /** accent hue (0–360) the whole theme animates to on this section */
  hue: number;
}

export interface MetaItem {
  label: string;
  value: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Service {
  /** short glyph used as the icon — keep it 1–3 characters */
  icon: string;
  title: string;
  body: string;
}

export interface Project {
  /** shown above the title, e.g. "001 / CHAT" */
  code: string;
  title: string;
  body: string;
  /** null when the work has no public URL — the card renders unlinked */
  href: string | null;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: IconName;
}

export interface Social {
  title: string;
  href: string;
  icon: IconName;
}

export const site = {
  /* ─────────── identity / <head> ─────────── */
  meta: {
    name: 'Ali Fazlollahi',
    /* Kept to one line in the rail. The hero typewriter cycles the more
       specific ones. */
    role: 'Developer',
    /* keep in step with `role` — it shows up in the tab, search results and
       every social card */
    title: 'Ali Fazlollahi — Developer',
    description:
      'Backend developer building Go services for a video platform with 40M+ monthly users — real-time chat, media pipelines and caching layers that hold under live-event traffic.',
    // sidebar logo: rendered as ~/handle
    handle: 'alifazl',
    /** canonical domain — keep in sync with `site` in astro.config.mjs */
    url: 'https://alifazlollahi.com',
    /** a second domain that should 301 to the canonical one; null if none */
    aliasDomain: null as string | null,
    /** shown next to the pulsing green dot in the sidebar */
    availability: 'available for work',
    location: LOCATION,
  },

  /* ─────────── navigation + per-section accent colour ─────────── */
  /* Hues deliberately avoid the 250–330 purple/pink arc. Neighbours in the
     scroll order are kept far apart so the shift between sections reads. */
  nav: [
    { id: 'home', label: 'HOME', hue: 186 },
    { id: 'about', label: 'ABOUT', hue: 212 },
    { id: 'skills', label: 'SKILLS', hue: 42 },
    { id: 'services', label: 'SERVICES', hue: 152 },
    { id: 'projects', label: 'PROJECTS', hue: 20 },
    { id: 'contact', label: 'CONTACT', hue: 96 },
  ] satisfies NavItem[],

  /* ─────────── hero ─────────── */
  hero: {
    prompt: 'ali@fazlollahi:~',
    /** the name, split into lines — the second line gets the gradient */
    lines: ['Ali', 'Fazlollahi'],
    /** optional second-script name under the latin one; null hides it */
    nameFa: null as string | null,
    /** cycled by the typewriter inside fmt.Println() */
    roles: [
      "I'm a backend developer",
      "I'm a Go developer",
      "I'm a full-stack developer",
      "I'm a software engineer",
      'I build real-time systems',
    ],
  },

  /* ─────────── the infinite marquee under the hero ─────────── */
  /* a highlight reel rather than a list of logos — numbers say more than
     names do, and these are all from shipped work */
  ticker: [
    'Golang',
    '40M+ monthly users',
    'Real-time systems',
    '80k+ concurrent connections',
    'Event-driven',
    '25k+ requests a second',
    'WebSocket · Kafka',
    '100k+ uploads a day',
    'Postgres · Redis · Scylla',
    'Docker · Kubernetes',
    'PHP · React · WordPress',
  ],

  /* ─────────── about ─────────── */
  about: {
    overline: '// 02 — information',
    heading: { lead: 'About', dim: 'me' },
    /* Each string is a paragraph. Wrap a phrase in <span class="hl">…</span>
       to brighten it. */
    /* Deliberately no employer names or dates — those live in the CV and go
       stale the day they change. What stays is the scale and the class of
       problem, which travel with me. */
    paragraphs: [
      'I build backend systems for products with a lot of people on the other end. Most of my work has been at <span class="hl">Iran\'s largest video platform</span> — video on demand, live sports, real-time chat — serving <span class="hl">40M+ monthly users</span>, where the hard problems only show up once a match kicks off and the traffic arrives all at once.',
      'In practice that has meant a chat backend holding <span class="hl">80k+ concurrent connections</span> across web, mobile and TV, rewritten from Node.js to Go when the first version ran out of headroom; an HLS caching layer serving <span class="hl">25k+ requests a second</span> in front of the stream origin; a short-video pipeline taking <span class="hl">100k+ uploads a day</span>; and a Go + FFmpeg service that cuts clips out of live streams the moment a goal lands. I led the Go backend team that shipped most of it.',
      'Go is my primary language, next to PostgreSQL, Redis, ScyllaDB and Kafka, with PHP and React on the web side. Since 2024 I live in Germany, where I also run the websites and IT for a language school — four WordPress sites, a digitised registration flow and an ERPNext-based HR system. I care about <span class="hl">systems that degrade instead of collapsing</span>, and about code the next person can follow.',
    ],

    /**
     * Portrait next to the text. The image itself lives at
     * `src/assets/me.png` — overwrite that file to change it and Astro
     * re-optimises it (webp + responsive sizes) on the next build.
     * Set to null to drop the frame entirely.
     */
    photo: {
      alt: 'Ali Fazlollahi',
      /** the little label in the corner of the frame */
      caption: LOCATION_LABEL,
    } as { alt: string; caption: string } | null,

    meta: [
      { label: 'Location', value: LOCATION_LABEL },
      { label: 'Working since', value: String(CAREER_START.year) },
      { label: 'Languages', value: 'Persian · English · German' },
      { label: 'Email', value: EMAIL },
    ] satisfies MetaItem[],

    /**
     * The CV lives at `public/Ali-Fazlollahi-Resume.pdf`.
     * To publish a new version just overwrite that one file — the filename
     * is what the visitor downloads, so keep the name the same.
     * Set `cv` to null to hide the button entirely.
     */
    cv: { label: 'Download CV ↓', href: CV_FILE } as {
      label: string;
      href: string;
    } | null,
  },

  /* ─────────── skills ─────────── */
  skills: {
    overline: '// 03 — abilities',
    heading: { lead: 'My', dim: 'skills' },
    /* {years} is filled from CAREER_START — at build time and again in the
       browser, so the number is never stale. */
    intro:
      '{years} years of shipping services other teams build on. No percentage bars — either I have used something in production or it is not on this list.',
    /* Grouped rather than ranked. Order inside a group is roughly how often
       I reach for it. */
    groups: [
      {
        label: 'Languages',
        items: ['Go', 'PHP', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Bash'],
      },
      {
        label: 'Architecture',
        items: [
          'RESTful APIs',
          'WebSocket',
          'Long polling',
          'Microservices',
          'Event-Driven Systems',
          'Domain-Driven Design',
          'Clean / Hexagonal',
          'Real-time & low-latency',
          'High-traffic & spike handling',
        ],
      },
      {
        label: 'Data',
        items: ['PostgreSQL', 'MySQL', 'Redis', 'ScyllaDB', 'Cassandra', 'MongoDB'],
      },
      {
        label: 'Messaging',
        items: ['Kafka', 'NATS', 'RabbitMQ'],
      },
      {
        label: 'Platform',
        items: ['Docker', 'Kubernetes (HPA)', 'Nginx', 'Apache', 'Linux', 'CI/CD', 'Git'],
      },
      {
        label: 'Observability',
        items: ['Prometheus', 'Grafana'],
      },
      {
        label: 'Media',
        items: ['HLS', 'FFmpeg', 'Headless Chromium'],
      },
      {
        label: 'Frontend',
        items: ['React', 'Next.js', 'Zustand', 'styled-components', 'SCSS'],
      },
      {
        label: 'Web & CMS',
        items: ['WordPress', 'SEO', 'ERPNext'],
      },
      {
        label: 'Leadership',
        items: ['Team lead', 'Mentoring', 'Code review'],
      },
    ] satisfies SkillGroup[],
  },

  /* ─────────── services ─────────── */
  /* Worded to read the same to a hiring manager and to a client: what I do,
     not what I will sell you. Six cards because the grid is three wide and
     six strong ones beat nine diluted. */
  services: {
    overline: '// 04 — capabilities',
    heading: { lead: 'What I', dim: 'do' },
    items: [
      {
        icon: '{ }',
        title: 'Backend & API Development',
        body: 'Go services behind REST, WebSocket and long-polling APIs, with PHP where the product already speaks it. Written so another team can integrate from the docs alone.',
      },
      {
        icon: '⇄',
        title: 'Real-Time & Event-Driven',
        body: 'WebSocket transports and Kafka-backed flows for chat, presence and phone-to-TV control — state synced across instances, backpressure planned before launch rather than discovered after.',
      },
      {
        icon: '⌁',
        title: 'High-Traffic & Caching',
        body: 'Systems that hold when a live event starts: Redis caching layers at 25k+ requests a second, hot paths profiled, rate limits and autoscaling set before the spike.',
      },
      {
        icon: '▶',
        title: 'Video & Media Pipelines',
        body: 'HLS manifest and segment delivery, FFmpeg clip generation from live streams, headless-Chromium thumbnail rendering — the plumbing behind a video platform.',
      },
      {
        icon: '◫',
        title: 'Full-Stack & Web',
        body: 'React SDKs and front-ends for the services I build, plus WordPress sites, SEO and business systems for organisations that need the whole thing to just work.',
      },
      {
        icon: '◈',
        title: 'Technical Leadership',
        body: 'Led a Go backend team: architecture reviews, code review, mentoring, and the call on what deserves its own service and which store it belongs in.',
      },
    ] satisfies Service[],
  },

  /* ─────────── projects (horizontal scroller) ─────────── */
  projects: {
    overline: '// 05 — selected work',
    heading: { lead: 'Selected', dim: 'work' },
    /* A backend portfolio has nothing to screenshot, so each card states the
       constraint and what was built. The product is context; the system is
       the work. No stack line — the list would be the same handful of names
       on every card. */
    note: 'A selection. Most of it runs behind other products and never got a landing page of its own.',
    scrollHint: '↔ scroll',
    items: [
      {
        code: '001 / CHAT',
        title: 'Real-Time Chat Service',
        body: 'Live chat for a video platform across web, iOS, Android and Android TV. Started on Node.js and Socket.IO, rewritten in Go when it ran out of headroom: 80k+ concurrent connections, sessions in ScyllaDB, Kafka syncing messages across 12 instances, autoscaled on Kubernetes.',
        href: null,
      },
      {
        code: '002 / SDK',
        title: 'Chat SDK (React)',
        body: 'The NPM package that plugs the chat into any of the company\'s platforms: virtualised message lists, custom reconnection logic, Zustand state and themeable styled-components. Cut integration time per platform by more than 60%.',
        href: null,
      },
      {
        code: '003 / CAST',
        title: 'Apollo Cast',
        body: 'A Go and PostgreSQL service that turns a phone into a remote and a TV into a screen. Speaks WebSocket, long polling and REST so that older smart TVs still work, with pluggable authentication per platform and a JS SDK for web apps.',
        href: null,
      },
      {
        code: '004 / HLS',
        title: 'HLS Caching Layer',
        body: 'Go and Redis in front of the stream origin: smart manifest and segment caching with per-device quality selection. Sustains 25k+ requests a second and takes most of the peak-traffic load off the origin servers.',
        href: null,
      },
      {
        code: '005 / CLIPS',
        title: 'Clip Creator',
        body: 'Cuts clips out of live streams the moment a goal lands. Keeps a rolling buffer of HLS segments in memory, stitches the window with FFmpeg, encodes 480p to 1080p and publishes to the CDN — stateless Go containers driven by REST, Kafka and WebSocket events.',
        href: null,
      },
      {
        code: '006 / SHORTS',
        title: 'Aparat Shorts',
        body: 'Backend for a Reels-style short-video feed — upload, processing and delivery at 100k+ uploads a day, built with the frontend and product teams while the product shipped weekly.',
        href: 'https://www.aparat.com/shorts',
      },
      {
        code: '007 / GAME CLUB',
        title: 'Game Club — Aparat Sport',
        body: 'Gamification on top of live sports: scoring, predictions, quizzes, missions, leagues and rankings for 3M+ users, event-driven on Kafka and sized for the spike the second a match kicks off.',
        href: 'https://www.aparatsport.ir/',
      },
      {
        code: '008 / DIWAN',
        title: 'DIWAN-Marburg Akademie',
        body: 'Websites and IT for a German language school in Marburg and Bonn: four WordPress sites, a digitised participant registration flow, automated mailing and an ERPNext HR system. SEO up 50%+, website-driven revenue up 70%+.',
        href: 'https://diwan-marburg.de',
      },
    ] satisfies Project[],
    /** the dashed card that closes the row — {years} is filled from CAREER_START */
    outro: {
      title: '+ plenty<br>more',
      body: '{years} years of services that never got a landing page — thumbnail renderers, internal APIs, data migrations, ops tooling, and <span class="hl">freelance PHP and WordPress work</span>.',
      cta: 'The CV has the full list',
      href: CV_FILE,
    },
  },

  /* ─────────── contact ─────────── */
  contact: {
    overline: '// 06 — location',
    heading: { lead: 'Contact', dim: 'me' },
    links: [
      {
        label: 'Email',
        value: EMAIL,
        href: `mailto:${EMAIL}`,
        icon: 'mail',
      },
      {
        label: 'LinkedIn',
        value: 'in/fazlollahi-ali',
        href: 'https://www.linkedin.com/in/fazlollahi-ali/',
        icon: 'linkedin',
      },
      {
        label: 'GitHub',
        value: 'github.com/alifazl3',
        href: 'https://github.com/alifazl3',
        icon: 'github',
      },
      { label: 'Location', value: LOCATION_LABEL, href: '#', icon: 'location' },
    ] satisfies ContactLink[],
    /* No form: a static site can't send mail on its own, and a contact form
       that needs a third party to work is worse than an address that always
       does. */
    lead: 'Email or LinkedIn is the fastest way to reach me.',
  },

  /* ─────────── sidebar socials + footer ─────────── */
  socials: [
    { title: 'GitHub', href: 'https://github.com/alifazl3', icon: 'github' },
    { title: 'LinkedIn', href: 'https://www.linkedin.com/in/fazlollahi-ali/', icon: 'linkedin' },
    { title: 'Email', href: `mailto:${EMAIL}`, icon: 'mail' },
  ] satisfies Social[],

  footer: {
    left: '© 2026 Ali Fazlollahi — built with too much coffee',
    links: [
      { label: 'Impressum', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },

  /* ─────────── boot sequence ─────────── */
  boot: {
    lines: [
      '> booting portfolio.sh',
      '> mounting /dev/experience',
      '> loading go modules …ok',
      '> compiling shaders …ok',
      '> starting server on :2026',
    ],
  },
} as const;

export type Site = typeof site;
