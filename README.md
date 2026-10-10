# Prabhav Krishna — Engineering Portfolio

> **Cinematic Developer Portfolio & Interactive Showcase**  
> High-performance digital workbench showcasing autonomous AI systems, macroeconomic index engines, and full-stack applications. Engineered with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lenis smooth scrolling, and Framer Motion.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black.svg?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react&logoColor=0A0F1D)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E.svg?logo=supabase&logoColor=white)](https://supabase.com/)

---

## 1. Project Overview & Value Proposition

This repository contains the source code for the personal developer portfolio of **Prabhav Krishna**. Designed with an archival, high-contrast dark aesthetic, the site showcases engineering projects, technical milestones, and verified systems architectures through tactile micro-interactions and smooth inertia scrolling.

---

## 2. Project Status

- **Status:** Live Web Portfolio / Production Frontend.
- **Default Branch:** `main`.
- **Primary Domain:** Personal Profile Portfolio.

---

## 3. Implemented Features & UI Systems

- **Cinematic Spring Physics Hero:** Inertia-driven text and background parallax transforms using Framer Motion springs (`useSpring`, `useTransform`).
- **Interactive Project Video Showcase:** Dynamic video modals featuring real UI screen captures, volume toggles, and responsive aspect-ratio handling.
- **Tactile CardStack Archive:** Interactive card stack component with 3D depth and gesture drag physics.
- **Virtual Smooth Scrolling:** Integrated Lenis virtual scroll engine (`lenis`, `@studio-freight/lenis`) locked during modal views.
- **Resume PDF Modal:** Client-side inline PDF document rendering powered by `react-pdf` and `pdfjs-dist` with keyboard escape listener.
- **Database Telemetry & Contact:** Supabase client integration (`@supabase/supabase-js`) and transactional messaging support (`resend`).
- **Command Palette:** Keyboard-navigable quick command palette (`cmdk`).

---

## 4. Technology Stack

- **Framework:** Next.js 16 (`16.2.10`), React 19 (`19.2.4`), React DOM (`19.2.4`)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), PostCSS
- **Animation & Physics:** Framer Motion (`12.42.2`), Lenis (`1.3.25`)
- **Component Primitives:** Lucide React (`1.23.0`), React Icons (`5.7.0`), Sonner (Toasts)
- **Document Viewing:** `react-pdf` (`10.4.1`), `pdfjs-dist` (`6.1.200`)
- **Backend & Cloud Services:** Supabase (`@supabase/supabase-js`), Resend (`6.17.1`), Vercel Analytics & Speed Insights

---

## 5. Repository Structure

```text
Portfolio/
├── public/                 # Static assets, project videos, audio, icons, and PDF resumes
├── src/
│   ├── app/                # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   ├── components/
│   │   ├── archive/        # CardStack and historical artifacts
│   │   ├── layout/         # SmoothScroll, Navbar, Footer
│   │   ├── sections/       # Hero, Projects, About, Contact, Gallery, Skills, Experience
│   │   └── ui/             # GlowCard, GlareHover, ShinyText, CommandPalette, CustomCursor
│   └── lib/                # Motion variants, Supabase client, pointer math, utilities
├── next.config.ts          # Next.js compiler and image configurations
├── package.json            # Pinned npm dependencies
├── postcss.config.mjs      # PostCSS configuration for Tailwind v4
└── tsconfig.json           # TypeScript strict compiler options
```

---

## 6. Prerequisites

- Node.js 18.18 or higher (Node.js 20+ recommended)
- npm, pnpm, or yarn

---

## 7. Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/prabhavkrishna17-max/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```ini
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

---

## 8. Development & Build Commands

### Start Local Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

### Production Build
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

---

## 9. Contributor Credits

- **Prabhav Krishna R** ([@prabhavkrishna17-max](https://github.com/prabhavkrishna17-max)) — Design, frontend architecture, animation engineering, and project curation.
