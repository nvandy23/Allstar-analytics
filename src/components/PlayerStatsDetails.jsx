import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PlayerStats = () => {
  const { id } = useParams();
  const [playerStats, setPlayerStats] = useState([]);

  const getPlayerStats = async () => {
    const url = `http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${id}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      const details = result?.sport_career_hitting?.queryResults?.row || null;
      setPlayerStats(details);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlayerStats();
  }, []);

  return (
    <div>
      <p>Abs: {playerStats?.ab}</p>
      <p>Hits: {playerStats?.h}</p>
      <p>Avg: {playerStats?.avg}</p>
      <p>HR: {playerStats?.hr}</p>
      <p>R: {playerStats?.r}</p>
      <p>RBI: {playerStats?.rbi}</p>
    </div>
  );
};

export default PlayerStats;




