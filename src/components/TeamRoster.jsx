
import { Link } from "react-router-dom";
const TeamRoster = ({ teamRoster }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {teamRoster?.map((p) => (
        <div key={p.player_id} className="bg-red-700 border-4 border-blue-500 p-4 flex flex-col justify-between">
          <div>
            {p.name_last_first} - {p.primary_position}
          </div>
          <div>
            <Link to={`/${p.player_id}/${p.primary_position}`} className="text-blue-500 hover:text-white">
              Player details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamRoster;





