# Simple Notes App (PWA)

<img width="1312" alt="Screenshot 2025-06-27 at 9 07 13 AM" src="https://github.com/user-attachments/assets/b3e56db0-a0d7-4d3a-805e-3ebc85ce1f4c" />



> **A privacy-first, offline-capable notes app**  
> No sign-up, no sync — everything is stored locally in your browser.

---

## Features
- Add, edit, delete notes
- Live word counter and auto-growing text areas
- Copy to clipboard in one click
- Local Storage persistence (your notes never leave your device)
- Installable as a Progressive Web App (PWA)
- Responsive, minimalist UI built with TypeScript + Vite

---

## Quick Start

pnpm install  
pnpm dev         → run locally  
pnpm build       → build for production  
npx serve dist   → preview production build

---

## Deployment (Cloudflare Pages)

1. Push the repo to GitHub.  
2. Go to Cloudflare Pages → Create Project  
3. Select your repo and configure:
   - Framework preset: Vite  
   - Build command: pnpm build  
   - Output directory: dist  
4. Click **Deploy**

---

## Install as an App

1. Open the app in Chrome (desktop or mobile)  
2. Use “Install” from the address bar or “Add to Home Screen”  
3. Launch Simple Notes from your apps — even offline

---

## Project Structure

simple-notes/  
├─ public/              → manifest, icons, service-worker  
├─ src/                 → main.ts, style.css, types.ts  
├─ dist/                → built production files  
└─ README.md            → this file

---

## Tech Stack
- Vite + TypeScript
- Vanilla CSS
- Service Worker (for PWA)
- Cloudflare Pages (for hosting)

---

## License
MIT © 2025 Ayub Yusuf
