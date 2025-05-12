🎧🎮 Data Showcase Website
A clean, modern, and minimalistic website showcasing personal projects with data visualizations from Spotify and League of Legends.

🧩 Project Overview
This is a Next.js application designed to demonstrate how to build a stylish data-driven portfolio site. It includes:

A homepage introducing the developer and linking to specific data sections.

A Spotify page visualizing music listening habits.

A League of Legends page displaying gameplay statistics.

Mock API routes simulating external data fetching.

📁 Project Structure
csharp
Copier
Modifier
/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   ├── league/         # League of Legends API mock
│   │   └── spotify/        # Spotify API mock
│   ├── league/             # League of Legends page
│   ├── spotify/            # Spotify data page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── league-auth-button.tsx
│   ├── spotify-auth-button.tsx
│   └── theme-provider.tsx  # Theme provider
├── lib/                    # Utilities & mock data
│   ├── league-mock.ts      # Mock LoL data
│   ├── spotify-mock.ts     # Mock Spotify data
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
✨ Features
🏠 Homepage
"About Me" section with a short bio.

Project Showcase with visual cards.

Smooth navigation to each data section.

Minimalist layout with clean typography.

🎵 Spotify Data Page
Displays:

Top Tracks

Top Artists

Recently Played

Interactive charts & graphs.

Time range selector: 4 weeks, 6 months, all time.

Clear instructions to integrate the real Spotify API.

🕹️ League of Legends Data Page
Shows:

Rank

Favorite Champions

Match History

Tabs to switch between different views.

Stats visualized through performance metrics.

Integration guide for the real Riot Games API.

🚀 Getting Started
Clone the repository

Run npm install to install dependencies

Start the development server with npm run dev

Open http://localhost:3000 in your browser

🔧 Extend It Further
🔑 Integrate Real Spotify Data
Create a Spotify Developer account

Register an app to get your Client ID and Client Secret

Use Authorization Code Flow for authentication

Update app/api/spotify/route.ts with real API calls

Replace mock functions in lib/spotify-mock.ts

⚔️ Integrate Real League of Legends Data
Get a Riot Games API key

Modify app/api/league/route.ts to call the Riot API

Replace mock functions in lib/league-mock.ts

Handle rate limiting and API errors properly

🛠️ Tech Stack
Next.js – React framework for building the app

Tailwind CSS – Utility-first CSS framework

shadcn/ui – Accessible component library

Recharts – Charting library for React

TypeScript – Strongly typed JavaScript

📚 Learning Resources
Next.js Docs

Tailwind CSS Docs

Spotify Web API Docs

Riot Games API Docs

Recharts Docs


