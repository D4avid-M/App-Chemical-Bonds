# Feline Bond Periodic Table

A colorful React website that lets users click two elements in the periodic table and see:

- electronegativity on the Pauling and Allen scales
- bond classification
- van Arkel–Ketelaar triangle placement
- an animated feline fusion based on bond strength
- bond-specific particle effects
- a chemistry recipe card explaining the bond

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`

## Deploy on Netlify

1. Push this folder to GitHub.
2. Import the repo into Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`

## Notes

- Some synthetic elements do not have complete electronegativity data, so those pairings are shown as data-limited.
- The triangle placement uses Allen values when available for both elements, otherwise Pauling.
