# Todo List

A todo list app built with vanilla JavaScript and Webpack. Tasks are organised into projects, and everything is saved in the browser so it is still there after a refresh. Built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) JavaScript curriculum.

**Live demo:** [https://abdullahf1111.github.io/todo-list/](https://abdullahf1111.github.io/todo-list/)

## Features

- Projects, with a default project that can never be deleted
- Create, edit, delete, and complete tasks
- Each task has a title, description, due date, and priority (low, medium, high)
- Tasks show a short summary (title and due date) and expand on click to show the details
- Priority colours and a strikethrough style for completed tasks
- Input validation with clear error messages
- Data saved in `localStorage` (projects, tasks, completed state)

## Tech Stack

- HTML, CSS, JavaScript (ES modules, classes)
- [Webpack 5](https://webpack.js.org/) with separate `common`, `dev`, and `prod` configs merged by `webpack-merge`
- `html-webpack-plugin`, `style-loader`, `css-loader`
- `localStorage` with JSON

## Project Structure

```
todo-list/
├── src/
│   ├── index.js        # entry point: events and wiring
│   ├── dom.js          # all DOM rendering
│   ├── todos.js        # owns the projects
│   ├── project.js      # owns the tasks of one project
│   ├── task.js         # one task and its validation
│   ├── storage.js      # save and load with localStorage
│   ├── id.js           # unique id helper
│   ├── style.css
│   └── template.html
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── package.json
```

## Design Notes

- **Logic is separate from the DOM.** `todos.js`, `project.js`, and `task.js` know nothing about the page. `dom.js` only draws what it is given and never changes data. `index.js` is the only file that connects the two.
- **Each object owns its own data.** `Todos` manages projects, `Project` manages tasks, and every lookup goes through ids.
- **The page is drawn from the data.** After every change the data is updated first, then saved, then the page is redrawn.
- **View state is not saved.** The open project and the expanded tasks only live in memory, so the app always opens on the default project.

## Getting Started

```bash
git clone https://github.com/AbdullahF1111/todo-list.git
cd todo-list
npm install
npm run dev
```

Then open the address printed in the terminal (usually `http://localhost:8080`).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with live reload (development mode) |
| `npm run build` | Builds the app into `dist/` (production mode) |
| `npm run deploy` | Pushes `dist/` to the `gh-pages` branch |

## What I Learned

- Organising code with ES modules and single-responsibility classes
- Separating application logic from DOM code
- Rebuilding class instances from JSON after reading `localStorage`
- Event delegation, `dataset`, and the native `<dialog>` element
- Setting up Webpack with dev and production configs, and deploying to GitHub Pages