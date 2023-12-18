import { useState, useEffect } from "react";

export default function TeamRoster() {
  const [teamRoster, setTeamRoster] = useState(null);

  async function getTeamRoster() {
    const url = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='2016'&end_season='2017'&team_id='121'`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setTeamRoster(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTeamRoster();
  }, []);

  return (
    <div>
      <h1>{teamRoster?.roster_team_alltime?.queryResults?.row[0]?.name_last_first}</h1>
    </div>
  );
}

