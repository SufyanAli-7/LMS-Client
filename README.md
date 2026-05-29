# Slidex LMS — Frontend Client

A state-of-the-art, premium Learning Management System (LMS) frontend dashboard built with **React 19**, **Vite**, and **Tailwind CSS v4**. Slidex features a completely responsive, multi-role user interface tailored for Administrators, Instructors, and Students.

---

## 🌟 Core Features

- **Multi-Role Dashboards:** Fully tailored workspace views for **Students**, **Instructors**, and **Administrators** with dynamic menu rendering based on user privileges.
- **Unified Learning Platform:** Course creation, curriculum management, and video lecture tracking built with interactive components.
- **Adaptive Layout System:** Smooth transition between a sticky, collapse-friendly sidebar for desktop viewports and an elegant, safe bottom navigation bar for mobile devices (< 768px).
- **Responsive Premium Tables:** Fully optimized table systems with smooth horizontal scrolling, sleek custom-designed WebKit scrollbars, and active state animations.
- **Role-Based Security:** Dynamic route access and context integration protecting analytical widgets and control panels.
- **Premium Design System:** Vibrant components styled with Tailwind CSS v4, smooth micro-animations, glassmorphism overlays, and robust Lucide React iconography.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **UI Component Library:** [Ant Design 6](https://ant.design/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router Dom 7](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## 📁 Directory Structure

```text
Client/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Reusable global UI components
│   ├── config/             # Environment configs
│   ├── context/            # Auth and Global State Providers
│   ├── pages/
│   │   ├── Dashboard/      # Unified role dashboards (Home, Users, Courses, Profile)
│   │   └── Frontend/       # Public-facing views (Home, FAQs, etc.)
│   ├── App.jsx             # Main Application router entry
│   ├── index.css           # Global custom CSS and Tailwind Imports
│   └── main.jsx            # React rendering and provider initialization
├── .env                    # Environment variables (git-ignored)
├── vercel.json             # Vercel Single Page App routing/rewrites
└── vite.config.js          # Vite build and reverse proxy configuration
```

---

## ⚙️ Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed on your machine.

### 2. Installation

Clone this directory or repository, navigate to the client folder, and run:

```bash
npm install
```

### 3. Environment Variables Configuration

Create a `.env` file in the root of the `Client` directory and define your API URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Running Locally

Start the Vite development server locally:

```bash
npm run dev
```

The application will run by default at `http://localhost:5173`. Vite is configured with a reverse proxy to route `/api` requests to your specified `VITE_API_BASE_URL` serverless or backend environment.

### 5. Building for Production

Compile a production-optimized build:

```bash
npm run build
```

This compiles optimized assets inside the `dist/` directory, ready to be hosted on CDN systems or static servers.

---

## 🚀 Deployment (Vercel)

The project includes a pre-configured [vercel.json](file:///c:/Users/user/Desktop/Web%20Dev/SMIT-WAMD/MERN-LMS/Client/vercel.json) file that handles Single Page Application (SPA) route rewrites automatically. This prevents `404 Not Found` errors when refreshing sub-routes like `/dashboard/courses` on production servers.

To deploy via Vercel CLI:

```bash
npm install -g vercel
vercel
```

Make sure to configure `VITE_API_BASE_URL` in the Vercel dashboard under the environment variables of your project settings!

---

## 📄 License

This software is licensed under the [ISC License](https://opensource.org/licenses/ISC).
