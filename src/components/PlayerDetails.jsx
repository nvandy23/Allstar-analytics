import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerDetails() {
  const [player, setPlayer] = useState(null);

  async function getPlayerDetails() {
    const url = `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='493316'`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setPlayer(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPlayerDetails();
  }, []);

  return (
    <div>
      <h1>{player?.player_info?.queryResults?.row.name_display_first_last
}</h1>
    </div>
  );
}

  



