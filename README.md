# PurpleChat

A React/Redux progressive and responsive web application.

## Technologies used
- React with Redux
- Firebase
- ES6/Babel
- Native-like mobile UX using manifest.json and service worker
- Offline capabilities with service worked and IndexedDB
- Material UI

## Configuration
Files that need to be changed:
- app/core/firebase.js
- app/core/config.js (For push notifications)

## Build and start
```bash
npm install
npm run build
npm run fire:serve
```

The push notifications won't work without a server. However writing one is trivial.

## Licence
ISC
