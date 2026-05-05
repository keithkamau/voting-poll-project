# Voting Poll App

A responsive React mini-project built with Vite and Tailwind CSS v4. Users can add poll options, vote once, and see live results all persisted via JSON Server.

---

## Contributors

- [Keith Kamau](https://github.com/keithkamau)
- [Emmanuel Torris](https://github.com/emmanueltorris-rgb)
- [Emmanuel Munene](https://github.com/nesh069)
- [Favour Kendi](https://github.com/favourkendi-dev)
- [Kiplimo Kiptoo](https://github.com/kiplimokiptoo)

---

## Features

- Add, vote on, and delete poll options
- Single vote per session — vote buttons disable after voting
- Live vote counts and percentage progress bars
- Leading option highlighted
- Reset all votes and options
- Data persists via JSON Server
- Responsive on mobile and desktop

---

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4 via `@tailwindcss/vite`

---

## Project Structure

```
src/
├── components/
│   ├── PollForm.jsx
│   ├── PollList.jsx
│   └── PollOption.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Setup

1. Clone the repository and navigate into it

   ```bash
   git clone <your-repo-url>
   cd voting-poll-project
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Tailwind CSS v4 Config

`vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

`src/index.css`
```css
@import "tailwindcss";
```
---