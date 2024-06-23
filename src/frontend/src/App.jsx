import React, { useState, useEffect, useRef } from 'react';
import Pitch from './components/Pitch';
import MatchStats from './components/MatchStats';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import PlayerStats from './components/PlayerStats';
import FreeKicks from './components/FreeKicks';

function App() {
  const [ballLocationData, setballLocationData] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch the ball data from the JSON file
    fetch('ball-data.json')
      .then(response => response.json())
      .then(data => {
        setballLocationData(data[0].match.ballLocation)
        setTeams(data[0].match.teams);
      });
  }, []);


  return <>
    <div className="flex flex-col items-center justify-center space-y-4 border border-black bg-blue-900 text-white w-100 h-100">
      <div className="text-center">
        <p>In-Play Football</p>
      </div>
      <div>
        <p>Milwall vs City</p>
      </div>
      <div className="border border-black relative">
        <Router>
          <div className="flex justify-center space-x-4 border border-black">
            <Link to="/pitch" className="hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:bg-white focus:border-2 focus:text-black">
              Pitch
            </Link>
            <Link to="/matchstats" className="hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:bg-white focus:border-2 focus:text-black">
              Match Stats
            </Link>
            <Link to="/playerstats" className="hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:bg-white focus:border-2 focus:text-black">
              Player Stats
            </Link>
            <Link to="/freekicks" className="hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:bg-white focus:border-2 focus:text-black">
              Free Kicks
            </Link>
          </div>
          <Routes>
            <Route path="/pitch" element={<Pitch ballLocationData={ballLocationData} teams={teams} />} />
            <Route path="/matchstats" element={
              <>
                <Pitch ballLocationData={ballLocationData} teams={teams} />
                <MatchStats ballLocationData={ballLocationData} />
              </>
            }
            />
            <Route path="/playerstats" element={<PlayerStats ballLocationPlayerData={ballLocationData} />} />
            <Route path="/freekicks" element={<FreeKicks  ballData={ballLocationData} teamsData={teams}/>} />

          </Routes>
        </Router>
      </div>
    </div>
  </>
}

export default App;
