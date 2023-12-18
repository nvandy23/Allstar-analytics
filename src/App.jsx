import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Title from './components/Title'
import TeamRoster from './components/TeamRoster'
import PlayerDetails from './components/PlayerDetails'


export default function App() {
  return (
    <>
      <header>
        <h1>
          <a href="/">Audubon Society</a>
        </h1>
      </header>
      <main>
  <Routes>
    <Route path="/" element={ <Title /> } />
    <Route path="/team" element={ <TeamRoster /> } />
    <Route path="/details/:id" element={ <PlayerDetails />} />
  </Routes>
</main>
    </>
  );
}

