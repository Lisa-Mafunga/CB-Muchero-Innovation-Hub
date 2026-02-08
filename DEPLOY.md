Deployment checklist — build and upload to cPanel

This project uses Vite + React and must be built before uploading to a static host like cPanel.

Recommended steps (local machine):

1. Install dependencies

```bash
npm ci
```

2. Build production bundle

```bash
npm run build
```

This produces a `dist/` folder containing `index.html` and `assets/`.

3. Verify `dist/index.html` references only relative paths (this repo sets `base: './'` in `vite.config.ts`).

4. Upload the contents of `dist/` to your cPanel Document Root (usually `public_html/`).
   - Upload the files directly or upload `dist.zip` and extract on the server.
   - Ensure `index.html` sits at the site root.

PowerShell example to build and zip:

```powershell
npm ci
npm run build
Compress-Archive -Path dist\* -DestinationPath dist.zip
```

5. (Optional) Ensure the `.htaccess` file is present in the web root (included in this repo). It enables SPA routing so client-side routes resolve to `index.html`.

Troubleshooting:
- Blank page: open browser DevTools → Console / Network to check for 404s on `assets/*.js`. If assets 404, ensure you uploaded `assets/` and `index.html` to same root.
- If hosting under a subfolder, set `base` in `vite.config.ts` to the subpath (e.g., `/subfolder/`) and rebuild.

If you want, I can prepare a `dist.zip` for you — but I can't run the build here. I can also help you walk through the build/upload process step-by-step.
