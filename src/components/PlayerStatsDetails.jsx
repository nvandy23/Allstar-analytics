import { useState, useEffect } from "react";

const PlayerStats = ({ id, position }) => {
  const [playerStats, setPlayerStats] = useState(null);

  const getPlayerStats = async () => {
    const urlHitting = `https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${id}`;
    const urlPitching = `https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id=${id}`;

    try {
      const response = await fetch(position === "P" ? urlPitching : urlHitting);
      const result = await response.json();
      const details = position === "P" ? result?.sport_career_pitching?.queryResults?.row : result?.sport_career_hitting?.queryResults?.row;
      setPlayerStats(details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayerStats();
  }, []); 

  if (!playerStats) {
    // document.body.classList.add('blue-background'); // Remove this line
    return (
      <div className="flex items-center justify-center h-screen bg-blue-900"> {/* Update this line */}
        <div className="text-7xl text-white">
          Loading...
        </div>
      </div>
    );
  }
  
  return (
    <div className='flex flex-col items-center justify-center bg-blue-900'>
      <div className="bg-red-700">
        <h1 className="text-6xl mb-4">Career Stats: </h1>
        {position === "P" ? (
          <>
            <p>Wins: {playerStats?.w}</p>
            <p>Losses: {playerStats?.l}</p>
            <p>ERA: {playerStats?.era}</p>
            <p>Innings Pitched: {playerStats?.ip}</p>
            <p>Strikeouts: {playerStats?.so}</p>
            <p>Walks: {playerStats?.bb}</p>
            <p>Hits Allowed: {playerStats?.h}</p>
          </>
        ) : (
          <>
            <p>Abs: {playerStats?.ab}</p>
            <p>Hits: {playerStats?.h}</p>
            <p>Avg: {playerStats?.avg}</p>
            <p>HR: {playerStats?.hr}</p>
            <p>R: {playerStats?.r}</p>
            <p>RBI: {playerStats?.rbi}</p>
            <p>Stolen Bases: {playerStats?.sb}</p>
          </>
        )}
      </div>
    </div>
  );
        }

export default PlayerStats;






