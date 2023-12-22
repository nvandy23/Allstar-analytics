import { Route, Routes } from 'react-router-dom';
import TeamDetails from './components/Title';
import TeamRoster from './components/TeamRoster';
import PlayerDetails from './components/PlayerDetails';
import PlayerStats from './components/PlayerStatsDetails';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<TeamDetails />} />
      <Route path="/team" element={<TeamRoster />} />
      <Route path="/:id/:position" element={<PlayerDetails />} />
      <Route path="/details/:id/stats" element={<PlayerStats />} />
    </Routes>
  </>
);

export default App;



