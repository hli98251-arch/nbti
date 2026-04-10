# Static Deployment Guide

## Build Output
- Build command: `npm run build`
- Output directory: `dist/`
- Runtime: none (pure static assets)

## Primary Target: Cloudflare Pages
- Framework preset: None / Static
- Build command: `npm run build`
- Build output directory: `dist`

## Compatible Targets
- Netlify
- GitHub Pages

## Base Path Note
If deploying under a sub-path, configure Vite `base` in `vite.config.js` and rebuild.

## No Backend Assumptions
This project does not require:
- API server
- database
- auth service
- dynamic image backend

## Verification Before Deploy
1. `npm test`
2. `npm run test:e2e`
3. `npm run build`
4. Preview locally with `npm run preview`
