import { NextResponse } from "next/server"

// Spotify OAuth configuration
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "your-client-id"
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/spotify/callback`
const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played"

export async function GET() {
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2, 15)

  // Store the state in a cookie for verification later
  const response = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&scope=${encodeURIComponent(SCOPE)}&state=${state}`,
  )

  // Set the state as a cookie
  response.cookies.set("spotify_auth_state", state, {
    maxAge: 60 * 10, // 10 minutes
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return response
}
export const dynamic = "force-dynamic";

// Votre code de route existant pour l'API Spotify
export async function GET(request) {
  // Récupérer les paramètres d'URL
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return new Response(JSON.stringify({ error: 'Authorization code missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Préparer les données pour la requête d'échange de code
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);
    
    // Requête pour obtenir le token d'accès
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`Error getting token: ${response.status}`);
    }

    const data = await response.json();
    
    // Retourner le token d'accès au client
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}