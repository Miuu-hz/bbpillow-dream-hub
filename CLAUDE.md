# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BBPillow is a Thai bedding e-commerce platform — a bilingual (TH/EN) high-fidelity React prototype targeting both B2C web and LINE Mini-App (LIFF) channels, plus a B2B wholesale inquiry flow. It is intentionally a **zero-build-step prototype**: React 18 and Babel are loaded from CDN, `.jsx` files are transpiled in-browser.

## Running the App

Open `index.html` directly in a browser — no server, no build, no install required. All `.jsx` files are `<script type="text/babel">` tags loaded by `index.html`. `Specs.html` is a living architecture document (wireframes, PostgreSQL schema, tech-stack recommendations) — open it separately in a browser.

## File Architecture

| File | Role |
|------|------|
| `index.html` | Entry point; loads React/Babel from CDN, CSS variables, Google Fonts, and all `.jsx` scripts |
| `app/data.js` | Single source of truth — 10 products, 6 categories, 5 materials, reviews, bilingual `dict`, helpers `t()` and `fmtBaht()` |
| `app/app.jsx` | Root router, cart state, language toggle, mode toggle (web ↔ mini), `ModeBar`, `PageShell` |
| `app/ui.jsx` | Design system — 33 SVG icons (`I.*`), `Btn`, `Badge`, `Stars`, `ProductCard`, `SectionHd`, `QtyStep`, `Field`, `EmptyArt` |
| `app/web.jsx` | Web screens — `Home`, `Shop`, `PDP`, `Cart`, `Checkout` |
| `app/web2.jsx` | Web screens continued — `Wholesale`, `Story`, `Dashboard` |
| `app/miniapp.jsx` | LINE LIFF screens — `MiniHome`, `MiniShop`, `MiniPDP`, `MiniCart`, `MiniCheckout`, `MiniMe`, `MiniTabBar` |
| `tweaks-panel.jsx` | Live design tweaker — palette (4), font pair (3), density, B2B toggle |
| `ios-frame.jsx` | iOS device frame wrapper for the mini-app preview |
| `Specs.html` | Architecture bible — wireframes, DB schema, full-stack migration roadmap |

## Global Namespace Pattern

Each file exports to a `window.*` namespace instead of ES modules (required by the browser-Babel setup):

- `window.BB` — data layer (products, categories, dict, `t()`, `fmtBaht()`)
- `window.BBUI` — shared UI primitives
- `window.BBWeb` — web screens
- `window.BBWeb2` — secondary web screens
- `window.BBMini` — mini-app screens

When adding a new component or screen, export it onto the appropriate namespace object at the bottom of the file.

## State Management

All state lives in `app.jsx` via React hooks and is passed as props. Key state:
- `cart` — array of `{ id, qty }`, auto-persisted to `localStorage`
- `mode` — `"web"` | `"mini"`, persisted as `bb-mode`
- `lang` — `"th"` | `"en"`, persisted as `bb-lang`
- `route` — `{ screen, ...params }`, persisted as `bb-route`
- `tweaks` — `{ palette, fontPair, density, b2bEmphasis }`, persisted as `bb-tweaks`

There is no Redux or Zustand — everything is props drilling from `app.jsx` down.

## Design System

**CSS variables** (defined in `index.html` `<style>`, overridden by palette tweaks at runtime):
- `--paper`, `--soil`, `--sky`, `--clay` — the 4 semantic color tokens
- `--heading-font`, `--body-font` — font pair tokens

**4 palettes:** default (earth/sky), warm, cool, sage  
**3 font pairs:** Prompt+Sarabun, Noto Serif Thai+IBM Plex Sans Thai, Mitr+Kanit  

All styling is done via inline `style` objects referencing CSS variables — no CSS-in-JS library, no Tailwind.

## i18n Pattern

```js
// data.js exposes:
window.BB.t(key, lang)          // look up dict[key][lang]
window.BB.fmtBaht(price)        // format Thai Baht

// Products have parallel th/en fields:
product.nameTh / product.nameEn
product.descTh / product.descEn
```

Pass `lang` (either `"th"` or `"en"`) as a prop; call `BB.t(key, lang)` at render time.

## Mini-App vs Web

The `ModeBar` at the top lets users toggle between web and mini-app views. In mini mode, the iOS frame (`ios-frame.jsx`) wraps the LIFF screens. Mini-app gives 2× loyalty points and uses `MiniTabBar` for navigation instead of the full web header.

## Planned Migration (from Specs.html)

The prototype is designed to migrate to: **Next.js 14 + TypeScript + Tailwind** (frontend), **NestJS/tRPC + PostgreSQL** (backend), **Omise/LINE Pay** (payments), deployed on **Vercel**. The `Specs.html` PostgreSQL schema is the canonical data model.
