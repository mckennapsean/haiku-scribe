# Haiku Scribe

A simple, elegant tool for writing haikus.

## Project Overview

Haiku Scribe is a modern, web-based haiku editor designed to help poets and writers craft perfect 5-7-5 syllable poems. Built with SvelteKit, it offers a clean, distraction-free interface and powerful real-time assistance.

### Key Features

- **Real-time Syllable Counting:** Get instant, color-coded feedback on your syllable count for each line to ensure you meet the 5-7-5 structure.
- **Word Assistant:** Click on any word to get instant synonym suggestions, complete with their syllable counts, to help you find the perfect word.
- **Local Storage Management:** Haikus are automatically saved to your browser's local storage, allowing you to manage drafts, save completed poems, and revisit them later on the "My Haikus" page.
- **Seamless Saving and Deletion:** Easily save and delete haikus from the editor and the list view.

## Technology Stack

- **Framework:** SvelteKit
- **Language:** TypeScript
- **Styling:** Standard CSS (with a focus on clean, responsive design)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
