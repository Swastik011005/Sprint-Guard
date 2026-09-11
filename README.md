# Sprint Guard

**Detect. Alert. Resolve. Deliver.**

Sprint Guard is a Scrum/Sprint management and blocker-detection platform for
Agile teams (Developers, Scrum Masters, and Product Owners). This repository
contains the **foundation build**: the Login, Role Selection, and Dashboard
UI, plus the navigation shell that future features will be built on top of.

This is UI-only for now — no backend, no real authentication, no third-party
integrations. All data is mock/static, kept in `src/data/`, so it can be
swapped for real API calls later without touching component code.

## Tech Stack

- React 18 + Vite
- JavaScript (no TypeScript)
- React Router v6
- Plain CSS (CSS variables for design tokens, no Tailwind)
- [lucide-react](https://lucide.dev/) for icons
- Charts are custom SVG/CSS — no charting library dependency

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default and opens on `/login`.

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Folder Structure

```
src/
├── components/
│   ├── ui/            Reusable primitives: Card, Button, Badge, Dropdown, Input
│   ├── navigation/     Sidebar, TopNavbar, SearchBar, UserProfile
│   ├── dashboard/      SummaryCard, SprintSelector, PriorityChart, SourceChart,
│   │                   BlockerTable, SprintHealthCard
│   └── common/         AppLayout (sidebar + top navbar shell used by Dashboard
│                       and the placeholder pages)
├── pages/
│   ├── Login/
│   ├── RoleSelection/
│   ├── Dashboard/
│   └── Placeholder/    Shared stub page for not-yet-built features
├── data/               Mock data (dashboardData.js, mockUsers.js, mockRoles.js)
├── styles/             variables.css (design tokens), global.css (reset)
├── App.jsx             Route definitions
└── main.jsx            App entry point
```

Reusable UI elements live under `components/ui`; anything specific to the
dashboard's own layout lives under `components/dashboard`. Keep that split as
the app grows — a component used on more than one page belongs in `ui/`.

## Routes

| Path               | Page                        | Uses sidebar/top navbar |
|---------------------|-----------------------------|:---:|
| `/login`            | Login                        | No |
| `/role-selection`   | Role Selection                | No |
| `/dashboard`        | Dashboard (main homepage)     | Yes |
| `/active-blockers`  | Placeholder                   | Yes |
| `/blocker-list`     | Placeholder                   | Yes |
| `/analytics`        | Placeholder                   | Yes |
| `/team-status`      | Placeholder                   | Yes |
| `/reports`          | Placeholder                   | Yes |

Navigation flow: **Login → Role Selection → Dashboard**. There is no real
auth guard yet, so every route is directly reachable by URL — that's
intentional for this stage.

## Auth & Role-Based Access Control (mock)

This is **mock authentication for prototyping**, not real security:

- `src/auth/AuthContext.jsx` — holds the signed-in user (`{ id, name, email, role }`), persisted to `localStorage` under `sprintguard.auth`. `login(email, password)` accepts any non-empty credentials; `selectRole(roleId)` sets the role; `logout()` clears everything.
- `src/auth/permissions.js` — the single source of truth for what each role can do (`PERMISSIONS` keys + a `ROLE_PERMISSIONS` map). Only `scrum-master` is filled in today; `developer` and `product-owner` exist as all-false placeholders ready to be filled in later without touching any component.
- `src/auth/ProtectedRoute.jsx` — route guards: `RootRedirect` (for `/`), `RedirectIfAuthenticated` (for `/login`), `RequireAuthenticated` (for `/role-selection`), `RequireAuthAndRole` (layout guard for the app shell), and `ProtectedRoute` (per-page permission gate that renders `AccessDenied` on failure).
- `src/pages/AccessDenied/` — shown whenever a signed-in, role-selected user lacks the permission a route requires.

Because only Scrum Master has permissions turned on right now, selecting **Developer** or **Product Owner** on the Role Selection screen will correctly land on an Access Denied screen when trying to reach `/dashboard` — that's the RBAC system working as designed, not a bug. Those roles get their own dashboards and permissions in a later phase.

## Development Workflow

```
                    main
                      │
             FOUNDATION VERSION  (this build)
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
    dev-swastik   dev-ayaan    dev-jai
          │           │           │
       Feature      Feature      Feature
          │           │           │
          └───────────┼───────────┘
                      ↓
                Pull Requests
                      ↓
                     main
```

- `main` — the stable, shared foundation. This build is intended to become
  that base.
- `dev-swastik`, `dev-ayaan`, `dev-jai` — individual feature branches. Each
  developer builds their assigned feature (Jira/Slack/GitHub integrations,
  real-time alerts, analytics, etc.) on their own branch and opens a Pull
  Request into `main` when ready.

### Notes for developers extending this foundation

- Add new pages under `src/pages/<PageName>/` and register the route in
  `src/App.jsx`. Wrap it in the existing `AppLayout` route group if it should
  show the sidebar/top navbar.
- Add new reusable UI pieces to `components/ui/`; keep feature-specific
  components in their own folder under `components/`.
- Keep mock data in `src/data/` shaped the way a real API response would
  look, so swapping in real fetching later is a smaller change.
- Design tokens (colors, spacing, radius, shadows) live in
  `src/styles/variables.css` — reuse them instead of hardcoding values so the
  visual identity stays consistent across features.
