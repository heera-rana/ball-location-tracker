import React, { useState, useEffect, useRef } from 'react';
import Pitch from './components/Pitch';
import Stats from './components/Stats';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [ballLocation, setBallLocation] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch the ball data from the JSON file
    fetch('ball-data.json')
      .then(response => response.json())
      .then(data => {
        setBallLocation(data[0].match.ballLocation)
        setTeams(data[0].match.teams);
      });
  }, []);


  return (
    <div className="flex flex-col items-center justify-center space-y-4 border border-black bg-blue-900 text-white w-100 h-100">
      <div className="text-center">
        <p>In-Play Football</p>
      </div>
      <div>
        <p>Millall vs City</p>
      </div>
      <div className="border border-black relative">
        <Router>
          <div className="flex justify-center space-x-4 border border-black">
            <Link to="/pitch" className="hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:bg-white focus:border-2 focus:text-black">
              Pitch
            </Link>
            <Link to="/stats" className="hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:bg-white focus:border-2 focus:text-black">
              Stats
            </Link>
          </div>
          <Routes>
            <Route path="/pitch" element={<Pitch ballLocation={ballLocation} teams={teams} />} />
            <Route path="/stats" element={<Stats ballLocation={ballLocation} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
