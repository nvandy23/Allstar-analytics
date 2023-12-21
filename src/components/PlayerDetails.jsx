import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerStats from "./PlayerStatsDetails";
import MLB from "../assets/mlb.jpg"
const PlayerDetails = () => {
  const { id } = useParams();
  const [playerDetails, setPlayerDetails] = useState(null);

  const getPlayerDetails = async () => {
    const url = `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id=${id}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      const details = result?.player_info?.queryResults?.row || null;
      setPlayerDetails(details);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlayerDetails();
  }, []);

  if (!playerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen "style={{ backgroundImage: `url(${MLB})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
    >
      <div className="flex flex-col min-h-screen">
        <nav className="bg-gray-800 text-white text-center p-4">
          <h1 className="text-6xl">{playerDetails.name_display_first_last}</h1>
          <h2>College: {playerDetails.college}</h2>
          <p>Birthdate: {playerDetails.birth_date}</p>
          <a href="/">Home</a>
        </nav>

        <div className="my-56 mx-8 rounded-lg flex items-center justify-center bg-blue-900">
          <div className="flex flex-col items-center justify-center p-4 bg-red-700 pr-4 text-white">
            <h1 className="text-6xl mb-4">Details:</h1>
            <p>Position: {playerDetails.primary_position_txt}</p>
            <p>Pro debut: {playerDetails.pro_debut_date}</p>
            <p> Height: {playerDetails.height_feet} {playerDetails.height_inches}</p>
            <p> Jersey Number: {playerDetails.jersey_number}</p>
            <p>Weight: {playerDetails.weight}</p>
            <p>Bats: {playerDetails.bats}</p>
            <p>Throws: {playerDetails.throws}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-red-700 ml-24 text-white">
            <PlayerStats
              id={playerDetails.player_id}
              position={playerDetails.primary_position_txt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;





