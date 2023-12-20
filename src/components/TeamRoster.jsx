
import { Link } from "react-router-dom";

const TeamRoster = ({ teamRoster }) => {
  return (
    <div>
      <h2>Team Roster</h2>
      <ul>
        {teamRoster?.map((p) => (
          <li key={p.player_id}>
            {p.name_last_first} - {p.primary_position}
            <Link to={`/details/${p.player_id}`}>Player details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamRoster;



