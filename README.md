# Voting Poll App

A responsive React mini-project built with Vite and Tailwind CSS. Users can add poll options, vote once, see live vote counts with percentage progress bars, reset vote totals, and keep data after refreshing the page through `localStorage`.

## Features

- Vite-powered React app
- Component structure: `App.jsx`, `PollForm.jsx`, `PollList.jsx`, and `PollOption.jsx`
- Shared state managed in `App.jsx`
- Props pass data down, event handlers send actions up
- Users can submit new poll options
- Vote buttons disable after the first vote
- Reset button clears all vote counts back to zero
- Poll options, vote counts, and vote status persist in `localStorage`
- Responsive Tailwind CSS interface using cyan, indigo, amber, and rose accents

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    PollForm.jsx
    PollList.jsx
    PollOption.jsx
```

## Collaboration Note

For the class requirement, push this project to the shared GitHub repository and have each of the four members make their own commits from their GitHub accounts.
