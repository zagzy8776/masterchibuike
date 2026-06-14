# Master Chibuike — Child Dedication Website

A beautiful, interactive website to celebrate Master Chibuike's child dedication. Features include a photo gallery with Cloudinary uploads, a wall of blessings with likes, scripture readings, and more.

## Tech Stack

- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS v4 + shadcn/ui
- **Backend**: Express.js + TypeScript + Neon (serverless PostgreSQL)
- **Media**: Cloudinary (image upload & optimization)
- **Deployment**: Vercel (frontend) + Render (backend)

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- npm or pnpm

### 1. Clone & Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Set Up Environment Variables

Copy `.env.example` to create your environment files:

**Frontend** — Create `src/.env`:
```env
VITE_API_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**Backend** — Create `backend/.env`:
```env
DATABASE_URL=postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
FRONTEND_URL=http://localhost:5173
```

### 3. Run Locally

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
npm run dev
```

Open http://localhost:5173 🎉

---

## ☁️ Services Setup

### Neon (PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project (select the free plan)
3. Copy the connection string from the dashboard
4. Set it as `DATABASE_URL` in your backend environment

### Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. From the dashboard, copy your **Cloud Name**
3. Go to **Settings → Upload → Upload presets**
4. Click **Add upload preset**:
   - Name: `chibuike_dedication` (or your choice)
   - Type: **Unsigned** (important!)
   - Folder: `chibuike-dedication`
   - Save
5. Set `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` in your frontend environment

---

## 🌐 Deployment

### Frontend → Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel will auto-detect Vite — no config needed
4. Add these **Environment Variables** in Vercel dashboard:
   - `VITE_API_URL` → `https://your-backend.onrender.com`
   - `VITE_CLOUDINARY_CLOUD_NAME` → your Cloudinary cloud name
   - `VITE_CLOUDINARY_UPLOAD_PRESET` → your upload preset
5. Deploy! 🚀

### Backend → Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

#### Option A: One-click with Blueprint
1. Push your code to GitHub
2. In Render dashboard, click **New → Blueprint**
3. Connect your repo — Render will read `backend/render.yaml`
4. Set the secret environment variables:
   - `DATABASE_URL` — your Neon connection string
   - `FRONTEND_URL` — your Vercel deployment URL (e.g. `https://chibuike-dedication.vercel.app`)

#### Option B: Manual Setup
1. In Render dashboard, click **New → Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `chibuike-dedication-api`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variables (same as Option A)
5. Deploy!

---

## 📁 Project Structure

```
├── index.html              # Entry HTML with SEO meta tags
├── vercel.json             # Vercel deployment config
├── vite.config.ts          # Vite configuration
├── src/
│   ├── main.tsx            # React entry point
│   ├── vite-env.d.ts       # Vite type declarations
│   ├── app/
│   │   ├── App.tsx         # Main app component
│   │   └── components/     # Section components
│   ├── utils/
│   │   └── api.ts          # API client & Cloudinary upload
│   └── styles/             # CSS files
├── backend/
│   ├── package.json        # Backend dependencies
│   ├── tsconfig.json       # TypeScript config
│   ├── render.yaml         # Render Blueprint config
│   └── src/
│       ├── index.ts        # Express server with middleware
│       ├── db.ts           # Neon database setup
│       ├── middleware/
│       │   └── errorHandler.ts
│       └── routes/
│           ├── blessings.ts
│           └── gallery.ts
└── .env.example            # Environment variable template
```

---

## 🔒 Production Features

- **Helmet** — Security headers (CSP, XSS, etc.)
- **Rate Limiting** — 100 req/15min general, 20 req/15min for writes
- **CORS** — Restricted to your frontend domain
- **Input Validation** — Server-side validation on all endpoints
- **Error Handling** — Centralized error handler with stack traces in dev
- **Cache Control** — Static assets cached for 1 year
- **SEO** — Open Graph tags, meta description, canonical URL
- **Health Check** — `/health` endpoint for monitoring

---

## 📝 License

Private — All rights reserved.