import { defineConfig } from 'astro/config';
// GitHub user/organization site: https://<OWNER>.github.io/
// Project site: set SITE_URL and BASE_PATH in GitHub Actions or locally.
export default defineConfig({ site: process.env.SITE_URL || 'https://liugelstudio.github.io', base: process.env.BASE_PATH || '/', output: 'static' });
