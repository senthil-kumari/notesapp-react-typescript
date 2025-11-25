# NoteFlow App

## Overview

This is a modern, single-page notes application built with React and strongly typed using TypeScript. It offers a clean, responsive interface for creating, viewing, editing, and deleting notes along with tags

The application leverages the browser's Local Storage for persistent data, allowing users' notes to remain available even after closing and reopening the browser.

## Features

- Create a new Note along with existing or new tags, Read/View all Notes, Update an existing Note and Delete Note
- Edit and Delete existing Tags
- Pick a color🎨 for each note
- Persistent Storage: Notes are saved and loaded from the browser's localStorage using a custom React hook (useLocalStorage)
- Filter the notes using note title and tags
- **Rich Text Editor** for formatting the Note body using Tiptap(https://tiptap.dev/)

## Tech Stack

- Frontend - React with Typescript
- Styling - React Bootstrap
- Tooling - Vite

## Installation

Follow these instructions to get a copy of the project up and running on your local machine.

1. Clone the repo

2. Install dependency

- npm install

3. Run the application in development mode:

- npm run dev


🌐 Live Demo  
🔗 [NoteFlow](https://noteflow-tool.vercel.app/)
