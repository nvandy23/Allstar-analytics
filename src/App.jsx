// import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import TeamDetails from './components/Title'
import TeamDetailsPage from './components/TeamRoster'
import PlayerDetails from './components/PlayerDetails'


export default function App() {
  return (
    <>
  <Routes>
    <Route path="/" element={ <TeamDetails/> } />
    <Route path="/team" element={ <TeamDetailsPage/> } />
    <Route path="/details/:id" element={ <PlayerDetails />} />
  </Routes>
    </>
  );
}

