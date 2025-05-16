import { LeagueDataDisplay } from "@/components/league-data-display"

export default function LeaguePage() {
  // Replace "YourSummonerName" with your actual League of Legends summoner name
  const yourSummonerName = "I AM IN MUSIC#CARTI"

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-white">League of Legends Stats</h1>
      <LeagueDataDisplay defaultSummonerName={yourSummonerName} />
    </div>
  )
}
