# GitHub Issues Tracker

A responsive React/Vite prototype for the NexGenix LTD Aspire Internship assignment.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. The current prototype includes:

- Sign-in screen with required-field validation
- Responsive issue grid matching the supplied Figma screenshots
- All/Open/Closed tabs and title search
- New Issue modal with title, description, priority, status, and label
- Issue details modal with delete and close actions

The data is currently held in React state as a frontend prototype. The next integration step is to replace the seed data and demo sign-in with REST API calls for JWT authentication, SQL persistence, and protected routes.
