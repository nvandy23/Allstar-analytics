import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerStats () {
// const {id} =useParams()
const [playerStats, setPlayerStats] =useState(null)
const [playerSeason,setPlayerSeason] =useState("2017")
 async function getPlayerStats () {
    const url = "http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='493316'"
    try {
        const response = await fetch(url);
        const result = await response.json();
        setPlayerStats(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
      getPlayerStats();
    }, []);
    return (
      <h1>Test</h1>
    )
 }


