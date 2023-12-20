import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerDetails() {
const {id} =useParams()
const [playerDetails,setPlayerDetails] = useState([])
  async function getPlayerDetails() {
    const url = `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id=${id}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      const details = result?.player_info?.queryResults?.row || null;
      setPlayerDetails(details);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPlayerDetails();
  }, []);

  if (!playerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Player Details</h2>
      <p>Name:{playerDetails.name_display_first_last}</p>
      <p>Position:{playerDetails.primary_position_txt}</p>
      <p>Birthdate:{playerDetails.birth_date}</p>
      <p>Pro debut:{playerDetails.pro_debut_date}</p>
      <p>College: {playerDetails.college}</p>
      <p>Height: {playerDetails.height_feet} {playerDetails.height_inches}</p>
      <p>Weight: {playerDetails.weight}</p>
      <p>Bats: {playerDetails.bats}</p>
      <p>Throws:{playerDetails.throws}</p>
    </div>
  );
  }
  



