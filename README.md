# Data Showcase Website

A complete, beginner-friendly website that showcases personal projects and visualizes data from Spotify and League of Legends with a clean, modern, and minimalistic design.

## Project Overview

This project is a Next.js application that demonstrates how to build a data visualization website. It includes:

- A homepage that introduces the developer and links to specific data sections
- A Spotify data page that visualizes music listening habits
- A League of Legends page that displays gaming statistics
- Mock API routes that simulate fetching data from external services

## Project Structure

\`\`\`
/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   ├── league/         # League of Legends API
│   │   └── spotify/        # Spotify API
│   ├── league/             # League of Legends page
│   ├── spotify/            # Spotify data page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── ui/                 # UI components (from shadcn/ui)
│   ├── league-auth-button.tsx
│   ├── spotify-auth-button.tsx
│   └── theme-provider.tsx  # Theme context provider
├── lib/                    # Utility functions and mock data
│   ├── league-mock.ts      # Mock League of Legends data
│   ├── spotify-mock.ts     # Mock Spotify data
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
\`\`\`

## Features

### Homepage
- About Me section with a short bio
- Project showcase with cards for each data visualization project
- Clean typography and minimalistic design
- Navigation buttons to specific data pages

### Spotify Data Page
- Displays top tracks, top artists, and recently played songs
- Visualizes data with charts and graphs
- Time range selector (4 weeks, 6 months, all time)
- Instructions for integrating with the real Spotify API

### League of Legends Data Page
- Shows player rank, favorite champions, and match history
- Visualizes performance metrics and statistics
- Tab navigation between different data views
- Instructions for integrating with the real Riot Games API

## How to Use

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Extending the Project

### Adding Real Spotify Data

1. Create a Spotify Developer account at [developer.spotify.com](https://developer.spotify.com)
2. Register a new application to get your Client ID and Client Secret
3. Set up authentication using the Authorization Code Flow
4. Update the API routes in `app/api/spotify/route.ts` to use the real Spotify API
5. Replace the mock data functions in `lib/spotify-mock.ts` with actual API calls

### Adding Real League of Legends Data

1. Register for a Riot Games API key at [developer.riotgames.com](https://developer.riotgames.com)
2. Update the API routes in `app/api/league/route.ts` to use the real Riot Games API
3. Replace the mock data functions in `lib/league-mock.ts` with actual API calls
4. Implement proper error handling and rate limiting

## Technologies Used

- **Next.js**: React framework for building the application
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: Component library for UI elements
- **Recharts**: For data visualization
- **TypeScript**: For type safety and better developer experience

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Riot Games API Documentation](https://developer.riotgames.com/docs/lol)
- [Recharts Documentation](https://recharts.org/en-US/)
