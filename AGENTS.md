# Project Guide

## Architecture

This is the single-page data-scientist portfolio of Md. Tamim Hossain, built with React 19, TypeScript, TanStack Start, and Vite. The application uses server rendering and the Netlify TanStack Start plugin. The only content route is `/`; portfolio sections use native anchors.

## Key files

- `src/routes/index.tsx`: renders the portfolio.
- `src/routes/__root.tsx`: document shell, finished SEO and Open Graph metadata, favicon, and font loading.
- `src/components/Portfolio.tsx`: navigation, section layouts, supplied personal content, project data, and scroll-reveal behavior.
- `src/components/DataVisuals.tsx`: original SVG charts, interactive illustrative trend, dashboard composition, and project illustrations.
- `src/components/ContactForm.tsx`: client-side accessible validation and Netlify Forms submission states.
- `src/styles.css`: exact palette tokens, visual system, breakpoints, and reduced-motion handling.
- `public/contact.html`: static Netlify Forms registration skeleton. Its form name and fields must match the React contact form.
- `public/favicon.svg`: TH monogram.
- `netlify.toml` and `vite.config.ts`: deployment and framework configuration.

## Conventions

Use named PascalCase React components, TypeScript strict mode, descriptive identifiers, and type-only imports for types. Keep styling in the existing CSS design system and reuse the palette tokens. Icons use Lucide. Keep charts code-native and lightweight instead of adding dependencies for decoration. Do not add code comments unless requested.

All portfolio claims must match the user-supplied information. Do not invent employment, university enrollment, proficiency ratings, metrics, credential identifiers, or repository and deployment links. Charts are synthetic illustrations and must retain visible illustrative labels and accessible descriptions. The unusual identical HSC and SSC periods were supplied by the user and must not be silently corrected.

## Forms and persistence

Netlify Forms is enabled. Contact requests must POST to `/contact.html`, not `/`, to avoid SSR interception. The static skeleton and React form use `portfolio-contact` with `form-name`, `bot-field`, `name`, `email`, `subject`, and `message`. Display success only after a successful service response. Email notification recipients require separate configuration in Netlify. Do not replace this with simulated submission, local JSON, or an in-memory persistence mechanism.

## Accessibility and motion

Maintain semantic heading order, accessible descriptions for SVG charts, visible keyboard focus, mobile menu focus containment and Escape handling, and inline validation. Intersection Observer enhances content that is visible by default, so server-rendered content remains accessible without JavaScript. Respect `prefers-reduced-motion` across all new animations. Preserve responsive layouts without horizontal overflow.

## Development

Install using `pnpm install`, run locally using `pnpm dev`, and build using `pnpm build`. The deployment pipeline generates the TanStack route tree automatically. There is no configured test suite. During automated Netlify agent runs, follow the run instructions: do not run local dev, build, or validation commands if prohibited; the platform validates the deployment.
