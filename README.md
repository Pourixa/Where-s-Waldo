# Where's Waldo?

A full-stack visual search game: explore an illustrated scene, find three target characters, and submit a completion time to a scene-specific leaderboard. The React frontend handles the image interaction, while an Express API checks guesses against target coordinates stored in PostgreSQL.

**[Play the live demo](https://where-s-waldo-wheat.vercel.app/)**

![Scene selection with Vault 0, Space Con, and Robot City](docs/screenshots/menu.jpg)

## Features

- Three seeded scenes: **Vault-0**, **Space-Con**, and **Robot-City**.
- Target portraits and names displayed above the scene.
- Image zoom, pan, and reset controls.
- Double-click a position, then select the character you think is there.
- Server-side bounding-box checks for submitted guesses.
- An elapsed-time display, completion form, and per-scene leaderboards.
- Database constraints that make player tags and target names unique within each scene.

![Vault 0 gameplay with target portraits, timer, leaderboard control, and zoom controls](docs/screenshots/game.jpg)

Screenshots were captured from the deployed application. The initial scene list can take a while to load while the API responds.

## How a guess is checked

The frontend converts a click into coordinates relative to the displayed image: `(clickX − imageLeft) / imageWidth` and `(clickY − imageTop) / imageHeight`. This expresses the position as a fraction of the image dimensions rather than a fixed screen pixel.

The API looks up the selected target for that scene and checks whether the submitted point lies inside its stored bounding rectangle. The response tells the frontend whether to mark that character as found.

This demonstrates server-side validation, but it is not a secure competitive scoring system: the current game response includes target coordinates, and completion times are supplied by the client.

## Architecture

| Location | Responsibility |
| --- | --- |
| `client/src/components/App.jsx` | Loads and displays the scene selection |
| `client/src/components/game.jsx` | Image interaction, guesses, progress, and score submission |
| `client/src/components/header.jsx` | Target list, timer, and leaderboard control |
| `api/app.js` | Express application, CORS configuration, and error handler |
| `api/routes/game.js` | Scene, guess-checking, and leaderboard endpoints |
| `api/middleware/game.js` | Loads scene data and player records |
| `api/prisma/schema.prisma` | Scene, target, and player models |
| `api/lib/seed.js` | Initial scenes, artwork URLs, and target bounds |

**Frontend:** React, React Router, Vite, CSS Modules, React Icons, and react-zoom-pan-pinch.

**Backend:** Node.js, Express, Prisma, PostgreSQL, and the Prisma PostgreSQL adapter.

## API overview

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/game` | List scenes and their player records |
| GET | `/game/:name` | Get a scene, targets, and leaderboard ordered by time |
| GET | `/game/:name/player` | Get the scene's player records |
| POST | `/game/:name` | Check a target name and normalized click position |
| POST | `/game/:name/player` | Save a username and completion time |

## Run locally

Use Node.js 22.12+ (the frontend build and Prisma generation were checked with Node.js 24), npm, and a running PostgreSQL database.

```bash
git clone https://github.com/Pourixa/Where-s-Waldo.git
cd Where-s-Waldo/api
npm ci
```

Create `api/.env` with your own database connection and the exact frontend origin:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/waldo
REACT=http://localhost:5173
```

Initialize your local database and start the API:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
node app.js
```

The API listens on port **8585**. In a second terminal, open the repository's `client/` directory and install its dependencies:

```bash
npm ci
```

Create `client/.env`:

```dotenv
VITE_API=http://localhost:8585
```

Then run `npm run dev`. If Vite selects a different port, update the API's `REACT` value to match and restart the API. Restart Vite after changing its environment file. `VITE_API` is a public API base URL, not a place to store secrets.

To build the frontend, run `npm run build` in `client/`. There is no root-level start command or API npm start script; the backend starts with `node app.js`.

## Current scope and verification

The frontend production build and Prisma client generation passed. The deployed scene menu and Vault-0 game screen were inspected; a complete local database setup and end-to-end score submission were not verified.

The current implementation assumes three targets per scene. Server-owned timing, stronger input validation, hiding target bounds from public responses, and improved network-error handling are future improvements. The completion check also needs to be tied strictly to a successful final guess. There is no automated test script in the current package configurations.

Scene illustrations and character images are third-party artwork used by the application; their inclusion does not imply original authorship or grant redistribution rights.
