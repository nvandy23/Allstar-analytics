import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function TeamDetails () {
  const [teamRoster, setTeamRoster] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStartSeason, setSelectedStartSeason] = useState("");
  const [selectedEndSeason, setSelectedEndSeason] = useState("");
  const [teamId, setteamId] = useState("");
  const [teamList, setTeamList] = useState([]);

  // this first call is just accessing the team name and trying to attach that to the id
  const fetchTeamList = async () => {
    try {
      const url = `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2017'`;
      const response = await fetch(url);
      const result = await response.json();
      const teams = result?.team_all_season?.queryResults?.row || [];
      setTeamList(teams);
      console.log(teams);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeamDetails = async () => {
    try {
      const url = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=${selectedStartSeason}&end_season=${selectedEndSeason}&team_id=${selectedTeam}`;
      const response = await fetch(url);
      const result = await response.json();
      const details = result?.roster_team_alltime?.queryResults?.row || [];
      setTeamRoster(details);
      console.log(details);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeamList();
  }, []);

  const handleSelectedTeamChange = (e) => {
    setSelectedTeam(e.target.value);
    const selectedTeamInfo = teamList.find(
      (team) => team.name_display_full === e.target.value
    );
    setteamId(selectedTeamInfo?.team_id || "");
  };

  const handleSelectedStartSeasonChange = (e) => {
    setSelectedStartSeason(e.target.value);
  };

  const handleSelectedEndSeasonChange = (e) => {
    setSelectedEndSeason(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedTeam && selectedStartSeason && selectedEndSeason) {
        await fetchTeamDetails();
        console.log(selectedTeam, selectedStartSeason, selectedEndSeason, teamId);
      } else {
        alert("Please select a team and enter start and end seasons");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label>
          Select Team:
          <select value={selectedTeam} onChange={handleSelectedTeamChange}>
            <option value="">Select a team</option>
            {teamList.map((t) => (
              <option key={t.team_id} value={t.team_id}>
                {t.name_display_full}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Start Season:
          <input
            type="text"
            value={selectedStartSeason}
            onChange={handleSelectedStartSeasonChange}
          />
        </label>
      </div>
      <div>
        <label>
          Select End Season:
          <input
            type="text"
            value={selectedEndSeason}
            onChange={handleSelectedEndSeasonChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <h2>Player Roster</h2>
<ul>
  {teamRoster.map((p) => (
    <li key={p.player_id}>
      {p.name_last_first} {p.primary_position}
      <Link to={`/details/${p.player_id}`}>Player details</Link>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

