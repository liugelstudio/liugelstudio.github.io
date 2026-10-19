# LIÜGEL STUDIO Official Website — M1

Astro + TypeScript / static GitHub Pages site. No API keys or paid services required.

## Local setup (Windows PowerShell)
```powershell
cd C:\Dev\LiugelStudio.Web
npm install
npm run dev
```
Open the URL shown by Astro (usually http://localhost:4321/).

## Production build
```powershell
npm run build
npm run preview
```

## GitHub Pages
1. Create a **public** repository, ideally `<GITHUB_USERNAME>.github.io` (replace with your actual account/organization name).
2. Push the contents of this project to the `main` branch.
3. In Settings > Pages > Build and deployment, select **GitHub Actions**.
4. Workflow `.github/workflows/deploy.yml` builds and deploys on push. Supports both user sites and project sites.
5. No real download/support URLs are present yet. Add only after confirmation.

## Files
- `public/assets/brand/liugel-studio.svg`: supplied SVG unchanged.
- `src/layouts/SiteLayout.astro`: common header/footer/navigation.
- `src/styles/global.css`: responsive design tokens and layout.
- `src/pages/`: site pages.

## Notes
- The favicon is a temporary generic letter icon, **not** an alteration of the supplied official logo.
- Website text and release status must be checked before publication.
- GitHub Pages site must be public for the assumed free plan.
