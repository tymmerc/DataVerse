# 🎧🎮 Data Showcase Website

A clean, modern, and minimalistic website showcasing personal projects with data visualizations from **Spotify** and **League of Legends**.

---

## 🧩 Project Overview

This is a **Next.js** application designed to demonstrate how to build a stylish, data-driven portfolio site. It includes:

- A homepage introducing the developer and linking to specific data sections.
- A Spotify page visualizing music listening habits.
- A League of Legends page displaying gameplay statistics.
- Mock API routes simulating external data fetching.

---
## To-Do

Voici une liste des tâches à accomplir pour améliorer ce projet :

- [ ] Faire le nom en haut, fix le y de tymeo 
- [ ] Ajouter une fonctionnalité de connexion via [Spotify API](https://developer.spotify.com/documentation/web-api/) pour récupérer les données utilisateur.
- [ ] Intégrer les statistiques de [League of Legends](https://developer.riotgames.com/) via l'API de Riot Games.
- [ ] Créer une interface utilisateur pour afficher les statistiques en temps réel.
- [ ] Ajouter une fonctionnalité de recherche pour filtrer les données par utilisateur, application, ou type de statistique.
- [ ] Mettre en place des graphiques interactifs avec [Chart.js](https://www.chartjs.org/) ou [D3.js](https://d3js.org/).
- [ ] Ajouter une option de personnal

---


## 📁 Project Structure

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


---

## ✨ Features

### 🏠 Homepage

- "About Me" section with a short bio.
- Project showcase with visual cards.
- Smooth navigation to each data section.
- Minimalist layout with clean typography.

### 🎵 Spotify Data Page

- Displays:
  - Top Tracks
  - Top Artists
  - Recently Played
- Interactive charts & graphs.
- Time range selector: **4 weeks**, **6 months**, **all time**.
- Instructions to integrate with the real **Spotify API**.

### 🕹️ League of Legends Data Page

- Shows:
  - Player Rank
  - Favorite Champions
  - Match History
- Tabbed navigation between data views.
- Performance stats visualized with charts.
- Instructions to integrate the real **Riot Games API**.

---

## 🚀 Getting Started

1. Clone the repository  
2. Run `npm install --legacy-peer-deps` to install dependencies  
3. Start the development server with `npm run dev`  
4. Open `http://localhost:3000` in your browser  

---
## 🔑 Configuration SSH pour GitHub

### Depuis votre terminal (en mode root) :
`ssh-keygen -t ed25519 -C "tym.mercier@gmail.com"`
(Laissez les options par défaut (appuyez sur Enter plusieurs fois))

### Affichez votre clé publique :
`cat ~/.ssh/id_ed25519.pub`

### Copiez la clé publique et ajoutez-la à GitHub :
Allez dans vos paramètres GitHub → SSH and GPG keys → New SSH key
Collez votre clé publique
Donnez un nom explicite (ex : serveur_root)

### Configurez votre dépôt local pour utiliser SSH :
`git remote set-url origin git@github.com:tymmerc/DataVerse.git`

### Poussez normalement vos modifications :
`bashgit push -u origin mainv`

---

## 🔧 Extend It Further

### 🔑 Integrate Real Spotify Data

1. [Create a Spotify Developer account](https://developer.spotify.com)
2. Register an app to get your **Client ID** and **Client Secret**
3. Use **Authorization Code Flow** for authentication
4. Update `app/api/spotify/route.ts` with real API calls
5. Replace mock functions in `lib/spotify-mock.ts`

### ⚔️ Integrate Real League of Legends Data

1. [Get a Riot Games API key](https://developer.riotgames.com)
2. Update `app/api/league/route.ts` to use the Riot API
3. Replace mock functions in `lib/league-mock.ts`
4. Add rate limiting and error handling

---

## 🛠️ Tech Stack

- **Next.js** – React framework for building the app  
- **Tailwind CSS** – Utility-first CSS framework  
- **shadcn/ui** – Accessible component library  
- **Recharts** – Charting library for React  
- **TypeScript** – Strongly typed JavaScript  

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)  
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)  
- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)  
- [Riot Games API Docs](https://developer.riotgames.com/docs/lol)  
- [Recharts Documentation](https://recharts.org/en-US/)  
