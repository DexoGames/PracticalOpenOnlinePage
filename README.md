# Dexo Games — Portfolio

Dexter Smith's portfolio site (https://www.dexo.games), built with **React + TypeScript + Vite**.

## Develop

```bash
npm install     # first time only
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build into dist/
npm run preview # serve the production build locally
```

## Editing content

All site content lives in `src/data/` — edit these and the UI updates automatically:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, tagline, hero bio, about paragraphs, email, footer |
| `skills.ts` | Skill categories shown in the About section |
| `socials.ts` | Social links + which ones appear as contact buttons |
| `games.ts` | The "My Games" grid (and featured carousel) |
| `projects.ts` | The "Other Projects" grid (and featured carousel) |
| `photos.ts` | Featured photo strip + the `/photos` gallery |

Setting `featured: true` on a game/project adds it to the homepage carousel;
`featuredOrder` controls its position. Images live in `public/images/`.

## Project structure

```
public/            Static assets served as-is (images, fonts, CNAME)
src/
  data/            Site content (see table above)
  types/           Shared TypeScript types for the content
  context/         ThemeContext (dark/light theme)
  hooks/           useNavBrandTyper, useScrolled
  lib/             Small helpers (cards, image fallback, scroll, cx)
  components/       UI components, each with its own .module.css
  pages/           HomePage, PhotosPage
  styles/          globals.css (reset, fonts, theme variables)
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. The custom domain is preserved via
`public/CNAME`.

**One-time setup:** in the GitHub repo, go to **Settings → Pages** and set
**Source = "GitHub Actions"**.
