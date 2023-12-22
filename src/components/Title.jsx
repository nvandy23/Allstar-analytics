import React, { useState, useEffect } from "react";
import TeamRoster from "./TeamRoster";
import '../App.css';

const TeamDetails = () => {
  const [teamRoster, setTeamRoster] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStartSeason, setSelectedStartSeason] = useState("");
  const [selectedEndSeason, setSelectedEndSeason] = useState("");
  const [teamId, setteamId] = useState("");
  const [teamList, setTeamList] = useState([]);
  // const navigate = useNavigate();

  const fetchTeamList = async () => {
    try {
      const url = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2017'`;
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
      const url = `https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=${selectedStartSeason}&end_season=${selectedEndSeason}&team_id=${selectedTeam}`;
      const response = await fetch(url);
      const result = await response.json();
      const details = result?.roster_team_alltime?.queryResults?.row || [];
      setTeamRoster(details);
      console.log(details);
      // navigate('/team')
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
        // navigate('/team')
      } else {
        alert("Please select a team and enter start and end seasons");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <h1 className="text-2xl font-bold mb-4">AllStar analytics</h1>
      {teamRoster? (
        <div className="flex flex-grow">
          <div className="grid grid-cols-4 gap-4 w-full bg-blue-900">
            <div>
              <label>
                Select Team:
                <select className="bg-red-500 text-white border-4 border-white" value={selectedTeam} onChange={handleSelectedTeamChange}>
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
                  className="bg-red-500 text-white border-4 border-white"
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
                  className="bg-red-500 text-white border-4 border-white"
                  type="text"
                  value={selectedEndSeason}
                  onChange={handleSelectedEndSeasonChange}
                />
              </label>
            </div>
            <div>
              <button className="border-4 border-red-500 hover:bg-red-500 mr-0" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow items-center">
          <div className="grid grid-cols-4 gap-4 w-full bg-blue-900">
            <div>
              <label>
                Select Team:
                <select className="bg-red-500 text-white border-4 border-white" value={selectedTeam} onChange={handleSelectedTeamChange}>
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
                  className="bg-red-500 text-white border-4 border-white"
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
                  className="bg-red-500 text-white border-4 border-white"
                  type="text"
                  value={selectedEndSeason}
                  onChange={handleSelectedEndSeasonChange}
                />
              </label>
            </div>
            <div>
              <button className="border-4 border-red-500 hover:bg-red-500 mr-0" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
      {teamRoster && (
        <div className="flex-grow">
          <TeamRoster teamRoster={teamRoster} />
        </div>
      )}
    </div>
  );
};

export default TeamDetails;




