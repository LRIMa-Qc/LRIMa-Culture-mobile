# LRIMa Culture mobile

## Deploying the web app

Run `npm run build` and publish the complete `dist/` directory, including
`sw.js`, `workbox-*.js`, `index.html`, and the hashed assets. Never publish
`dev-dist/`: it contains a development service worker, not a production build.
Publish each release atomically so clients cannot fetch a mixture of releases.
Keep previous hashed assets available during the transition for open clients.

Configure the web host or CDN to revalidate `index.html` (including SPA route
fallbacks), `sw.js`, and `manifest.webmanifest` with `Cache-Control: no-cache`.
Do not apply a long-lived asset cache policy to these files. Missing service
worker scripts must return 404, not the SPA HTML fallback. Purge any previously
cached copies of these entry files from the CDN when correcting deployment.

The app checks for service worker updates at startup, when brought back to the
foreground, when connectivity returns, and hourly while visible. A new worker
activates automatically and reloads open clients; offline clients keep their
cached version until they can fetch an update. Development mode does not install
a service worker; use `npm run build` and `npm run preview` to test PWA updates.

If an older interface reappears, compare a fresh browser profile with the affected
one and inspect Application > Service Workers in browser developer tools. If only
the affected profile is stale, unregister its worker and reload as a one-time
recovery. If a fresh profile also receives the old build, inspect the deployed
files, CDN, and all origin instances for inconsistent releases. An old `sw.js`
can install an old app shell even after a newer page has loaded.

The checked-in `ngnix.conf` currently proxies to `ghost:2368`; it is not a static
hosting configuration for this app. Confirm the actual production host before
using or modifying that configuration.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
