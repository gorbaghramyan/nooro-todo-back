# Nooro Todo API

Welcome! This is a tiny REST API for managing tasks, built with Express.js, TypeScript, and Prisma for Nooro.

## What you need

- Node.js 20 or newer
- A MySQL database

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy the example environment file and plug in your own settings. At minimum you'll need a connection string for MySQL; `PORT` lets you change the default server port.
   ```bash
   cp .env.example .env
   # open .env and update values
   ```
3. Generate the Prisma client and sync the schema to your database (or use migrations if you prefer).
   ```bash
   npx prisma generate
   npm run prisma:push
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. For production you need to build and run the app:
   ```bash
   npm run build
   npm start
   ```

## Project structure

A quick tour of the repository:

```
.
├── prisma/
│   └── schema.prisma        # Prisma schema and models
├── src/
│   ├── index.ts             # Express server and route definitions
│   └── lib/
│       └── prisma.ts        # Prisma client instance
├── package.json
├── tsconfig.json
└── README.md
```

## REST API

The API speaks JSON and exposes the following endpoints:

| Method | Path         | Purpose                                   |
| ------ | ------------ | ----------------------------------------- |
| GET    | `/tasks`     | List all tasks                            |
| POST   | `/tasks`     | Create a task; body `{ title, color }`    |
| PUT    | `/tasks/:id` | Update task `title`, `color`, `completed` |
| DELETE | `/tasks/:id` | Remove a task                             |

