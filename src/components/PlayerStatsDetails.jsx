import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerStats() {
  const { id } = useParams();
  const [playerStats, setPlayerStats] = useState([]);

  async function getPlayerStats() {
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
  }

  useEffect(() => {
    getPlayerStats();
  }, []);

  return (
    <div>
      <p>{playerStats?.ab}</p>
    </div>
  );
}



