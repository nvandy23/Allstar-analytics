import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerDetails (){
    const [player, setPlayer] = useState(null);

    async function getPlayerDetails (){
      const url = `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id=${player_id}`

try {
	const response = await fetch(url);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}

        }
        useEffect(() => {
            getPlayerDetails();
          }, []);

  //const handleChange = (e) =>{

 // }
        return (
        <h1>Player details</h1>
        )

        
    }
  



