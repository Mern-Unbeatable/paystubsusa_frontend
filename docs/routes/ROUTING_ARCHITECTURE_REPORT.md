# Router Setup Report (Current Architecture)

Updated: 2026-11-06

## 1) Overview

The app uses React Router (`createBrowserRouter`) with centralized route composition and role-based guards.

- Router entry: `src/router/index.js`
- Route composition: `src/router/routes/buildRoutes.js`
- Path and alias config: `src/config/paths.js`
- Guards: `src/router/guard/*`
- Route modules: `src/router/routes/*Routes.js`
- Lazy wrapper: `src/router/routes/createLazyRouteElement.js`

## 2) Current Router Folder Structure

```text
src/router/
├── index.js
├── guard/
│   ├── GuardRedirect.jsx
│   ├── RequireAuth.jsx
│   ├── RequireAdmin.jsx
│   └── RequireGuest.jsx
└── routes/
    ├── buildRoutes.js
    ├── createLazyRouteElement.js
    ├── publicRoutes.js
    ├── authRoutes.js
    ├── customerRoutes.js
    ├── adminRoutes.js
    ├── safeRedirect.js        (currently unused)
    └── lazyPage.js            (currently unused)
```

> Note: loading components are currently imported from `src/Components/loader/*` by `createLazyRouteElement.js`.

## 3) Route Composition

`buildRoutes.js` defines the full hierarchy:

1. Public routes under `/` with `PublicLayout`
2. Guest-only auth routes wrapped by `RequireGuest` + `AuthLayout`
3. Auth-protected dashboard branch wrapped by `RequireAuth`
   - Customer routes
   - Admin routes wrapped again by `RequireAdmin`
4. Legacy aliases converted to redirects via `ALIASES`

## 4) Route Groups and Paths

### Public (`publicRoutes.js`)
- `/` (index)
- `/paystub-generator`
- `/w-2`
- `/1099-nec`
- `/direct-deposit`
- `/pricing`
- `/find-paystubs`
- `/about`
- `*` (NotFound)

### Auth (`authRoutes.js`)
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

### Customer (`customerRoutes.js`)
- `/customer/home`
- `/customer/overview`
- `/customer/documents`
- `/customer/payments`
- `/customer/subscription`
- `/customer/help`
- `/customer/profile`

### Admin (`adminRoutes.js`)
- `/admin` (index redirect to `/admin/overview`)
- `/admin/home`
- `/admin/overview`
- `/admin/users`
- `/admin/customers`
- `/admin/documents`
- `/admin/orders`
- `/admin/transactions`
- `/admin/subscriptions`
- `/admin/templates`
- `/admin/pricing`
- `/admin/profile`

## 5) Guard Responsibilities

### `RequireAuth`
- Checks auth state from `useAuth()`
- Redirects unauthenticated users to `PATHS.AUTH.login`
- Preserves source location in `state.from`
- Uses `GuardRedirect` to show toast

### `RequireAdmin`
- Enforces `user.role === "admin"`
- Redirects non-admin users to `PATHS.CUSTOMER.dashboard`
- Uses `GuardRedirect` for unauthorized toast
- Relies on parent `RequireAuth` in route tree for authentication

### `RequireGuest`
- Blocks authenticated users from auth pages
- Redirects authenticated users to `PATHS.CUSTOMER.dashboard`

### `GuardRedirect`
- Central redirect helper with optional toast behavior

## 6) Lazy Loading Strategy

- Route modules use `React.lazy` for page loading.
- `createLazyRouteElement` wraps each lazy page with:
  - `LazyRouteErrorBoundary`
  - `Suspense`
  - `RouteLoadingFallback` (`compact` optional)
- Current lazy imports mostly resolve from page-level barrel exports.

## 7) Alias Redirects

Alias redirects are generated from `ALIASES` in `src/config/paths.js`, then appended in `buildRoutes.js` using `<Navigate replace />`.

Examples:
- `generator` -> `/paystub-generator`
- `signin` -> `/login`
- `/dashboard` -> `/customer/overview`
- `/admin` -> `/admin/overview`

## 8) Current Notes

- `safeRedirect.js` exists but is not currently referenced.
- `lazyPage.js` exists but is not currently referenced.
- Router build is currently healthy (route composition compiles successfully).

