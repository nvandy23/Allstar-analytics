import { useState, useEffect } from "react";

const PlayerStats = ({ id, position }) => {
  const [playerStats, setPlayerStats] = useState(null);

  const getPlayerStats = async () => {
    const urlHitting = `http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${id}`;
    const urlPitching = `http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id=${id}`;

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      {position === "P" ? (
        <>
          <p>Wins: {playerStats?.w}</p>
          <p>Losses: {playerStats?.l}</p>
          <p>ERA: {playerStats?.era}</p>
        </>
      ) : (
        <>
          <p>Abs: {playerStats?.ab}</p>
          <p>Hits: {playerStats?.h}</p>
          <p>Avg: {playerStats?.avg}</p>
          <p>HR: {playerStats?.hr}</p>
          <p>R: {playerStats?.r}</p>
          <p>RBI: {playerStats?.rbi}</p>
        </>
      )}
    </div>
  );
};

export default PlayerStats;






