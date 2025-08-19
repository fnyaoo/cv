# CV App

A web application for creating and editing a personal resume.  
Supports authentication via GitHub and direct editing of data on the site.

> Forked from [BartoszJarocki/cv](https://github.com/BartoszJarocki/cv)  
> A clean and modern web app that renders a minimalist CV/Resume with a print-friendly layout.  
> Live Preview: [https://cv.fnyaoo.com](https://cv.fnyaoo.com)  

### Features
- View your resume as a modern single-page website  
- Sign in with **GitHub**  
- Edit resume content through a built-in JSON editor  

### Tech Stack
- **Next.js** — React framework  
- **NextAuth.js** — GitHub authentication  
- **CodeMirror** (`@uiw/react-codemirror`) — JSON editor  
- **Tailwind CSS** — styling  

### Environment Variables (`.env.local`)
```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=random_string
NEXTAUTH_URL=http://localhost:3000
ALLOWED_EMAIL=user_email_allowed_for_editing
```

### Run Instructions (with pnpm)
```bash
# 1. Install dependencies
pnpm install

# 2. Run the development server
pnpm dev

# 3. Open in browser
http://localhost:3000
```

### Build for Production
```bash
# Build the app
pnpm build

# Start production server
pnpm start
```

### Run with Docker Compose
You can also build and run the application using **Docker Compose**.

```bash
# Build and start containers
docker compose up --build

# Stop containers
docker compose down
```

By default, the app will be available at:  
[http://localhost:3000](http://localhost:3000)
