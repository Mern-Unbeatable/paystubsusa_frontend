
# CrapUI

CrapUI is a refined React starter built for developers who want speed, clarity, and a production-ready foundation without the usual setup fatigue. It combines modern tooling, clean defaults, and an intuitive structure so you can focus on building — not configuring.

If you value **simplicity**, **performance**, and **developer experience**, this starter gives you everything you need from day one.

---

## ✨ What You Get Out of the Box

**Core Frameworks**

- **React 19** — fast, stable, and future-proof
- **React Router** — modern routing, preconfigured
- **Vite** — ultra-fast dev server & optimized builds

**Styling**

- **Tailwind CSS** — fully set up and ready
- Clean utility-first workflow

**Enhancements**

- **Lenis Smooth Scrolling** — premium-grade scroll experience
- **Motion-ready animations** — built for fluid interactions
- **Lucide + React Icons** — scalable icon systems

**Architecture & Utilities**

- Pre-built **Context API** structure
- Organized folder system
- ESLint for consistency

A starter that feels minimal — but works like a full professional setup.

---

## ⚙️ Tech Stack Overview

**Runtime**

- React: 19.2.0
- React DOM: 19.2.0

**Build Tools**

- Vite: 7.2.4
- @vitejs/plugin-react: 5.1.1

**Styling**

- Tailwind CSS: 4.1.18
- @tailwindcss/vite: 4.1.18

**Icons & Utilities**

- react-icons: 5.5.0
- lucide: 0.562.0
- react-router: 7.12.0

**Linting**

- ESLint: 9.39.1
- @eslint/js: 9.39.1

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
  api/              → Axios singleton, interceptors, HTTP client, endpoint map, error normalization
  features/         → Feature-first modules (auth slice/thunks/selectors/services)
  store/            → Redux store and root reducer
  Components/       → Reusable UI components
  pages/            → Route-level UI pages
  router/           → Route config and guards
public/             → static assets (logos, images)
index.html          → main HTML entry
vite.config.js      → Vite configuration
```

## 🔌 API + Redux Architecture

Request flow:

`React Component → Redux Thunk → Feature Service → HTTP Client → Axios Instance → Backend API`

Key modules:

- `src/api/axiosInstance.js` — centralized Axios instance (base URL, timeout, headers, interceptors, token refresh lock)
- `src/api/httpClient.js` — reusable GET/POST/PUT/PATCH/DELETE wrappers with consistent responses
- `src/api/endpoints.js` — centralized endpoint dictionary with dynamic route helpers
- `src/features/auth/` — auth service + Redux Toolkit state management

## 🔐 Environment Configuration

Configure API/auth behavior with Vite env variables:

- `VITE_API_BASE_URL` (example: `https://api.example.com`)
- `VITE_API_TIMEOUT_MS` (default: `15000`)
- `VITE_API_WITH_CREDENTIALS` (`true` by default)
- `VITE_API_REFRESH_ENDPOINT` (default: `/auth/refresh`)
- `VITE_USE_DEMO_AUTH` (`true` to force demo mode)

---

## 💡 Why CrapUI?

- **Zero setup overhead**
- **Modern defaults that scale**
- **Instant design-ready environment**
- **Smooth scrolling that feels premium**
- **Icons and animations built-in**
- **Production-friendly architecture**

It’s engineered for creators who want to ship fast — without sacrificing quality.

---

## 🤝 Contributing

Contributions are appreciated. Please open an issue before starting major changes to stay aligned with the project direction.

Small, focused PRs help maintain quality and momentum.

---

**Built with care, crafted for speed — CrapUI**
A starter that respects your time.

---
