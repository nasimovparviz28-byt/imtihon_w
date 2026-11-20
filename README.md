# Najot Talim

React + Vite frontend and an Express backend that stores applications in MongoDB.

## Run locally

1. Start MongoDB. If Docker is installed, run `docker compose up -d` in this project to start a local MongoDB container. If you use MongoDB Atlas, set its connection string as `MONGODB_URI` in `.env`.
2. Start the backend and frontend together:

   ```bash
   npm run dev
   ```

This starts the frontend and backend together. Vite forwards `/api` requests to `http://localhost:5000`. The backend retries the MongoDB connection every five seconds if MongoDB is still starting.

## API

- `GET /api/health` reports server and MongoDB connection status.
- `GET /api/courses` returns the course list.
- `POST /api/leads` validates and stores an application in the `leads` collection. JSON body: `fullName`, `phone`, `course`, `branch`.

Keep private MongoDB connection strings in `.env`; never commit them to the repository.

## Student accounts

- New form submissions are saved as pending applications.
- Open `/admin` and use `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env` to review applications.
- Approving an application creates a student account. The student's phone number is the login; the generated temporary password is shown once in the admin panel. Use **Yangi parol berish** if it needs to be generated again.
- Students sign in at `/login` and reach their dashboard at `/cabinet`.
- Keep `AUTH_SECRET` and all `.env` credentials private. Set unique values before deploying.
- For local UI demos only, `.env` can set `ALLOW_ANY_LOGIN=true`; any non-empty login and password opens a demo student cabinet. This does not approve or save a student, and is automatically disabled when `NODE_ENV=production`. Keep it `false` for deployment.
