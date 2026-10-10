# Md. Tamim Hossain — Data Scientist Portfolio

A responsive, single-page portfolio with a premium dark navy and cyan visual identity. It presents Tamim’s data-science skills, customer churn and income-analysis projects, process, education, certification, and contact information without fabricated professional experience or project results.

## Technologies

- React 19 and TypeScript
- TanStack Start and TanStack Router for server rendering and routing
- Vite 7 and Tailwind CSS 4, with a custom CSS design system
- Lucide icons and lightweight, original SVG chart components
- Netlify Forms for contact submissions and Netlify for deployment

## Local development

Use Node.js 22 or later and pnpm:

```sh
pnpm install
pnpm dev
```

The development site runs at `http://localhost:3000`. `pnpm build` produces the deployment output; Netlify handles the production build using `netlify.toml` and the TanStack Start integration.

## Contact submissions

The contact form submits URL-encoded data to `/contact.html`, a static Netlify Forms registration file. Netlify Forms has been enabled for the site. Submission storage works after deployment; it is not emulated by the standalone Vite development server. The interface displays success only after a successful submission response and preserves the message on failure, with direct email as a fallback.

Submissions can be reviewed in the Netlify project’s Forms section. Configure **Project configuration → Notifications → Emails and webhooks → Form submission notifications** if email delivery alerts are desired. No email notification recipient was configured by this implementation.

## Content and accessibility

Personal content and supplied repository links are defined in `src/components/Portfolio.tsx`. All chart values are explicitly illustrative, not verified project metrics or Census findings. The education periods are retained exactly as supplied. The interface includes mobile navigation, active section indicators, visible focus states, field validation, semantic sections, chart labels, a skip link, and reduced-motion support.

The page uses Manrope and Inter from Google Fonts with local fallback fonts. No stock portraits, generated bitmap assets, chart libraries, AI features, or database services are required.
