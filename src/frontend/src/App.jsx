// import React, { useState, useEffect } from 'react';
// import './App.css';
// import footballpitch from './assets/footballpitch.jpg';

// function App() {
//   const [ballLocation, setBallLocation] = useState([]);
//   const [selectedCoordinates, setSelectedCoordinates] = useState({x: 50, y: 50});

//   useEffect(() => {
//     // Fetch the ball data from the JSON file
//     fetch('ball-data.json')
//       .then(response => response.json())
//       .then(data => setBallLocation(data[0].match.ballLocation));
//   }, []);

//   const handleSelectChange = (event) => {
//     const selectedLocation = ballLocation[parseInt(event.target.value.split('-')[1])];
//     setSelectedCoordinates(selectedLocation.coordinates);
//     event.target.style.color = 'black';
//   };
//   return (
//     <div className="flex flex-col items-center justify-center space-y-4 border border-black bg-blue-900 text-white">
//         <div className="text-center">
//          <p>In-Play Football</p>
//        </div>
//        <div>
//          <p>X v Y</p>
//        </div>
//        <div className="flex justify-center space-x-4 border border-black">
//          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//            Button 1
//          </button>
//          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//            Button 2
//          </button>
//          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//            Button 3
//          </button>
//        </div>
//        <div className="flex justify-center space-x-4 border border-black">
//          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//            Button 4
//          </button>
//          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//            Button 5
//          </button>
//          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//            Button 6
//          </button>
//        </div>
//       <div className="border border-black relative">
//         <img src={footballpitch} alt="Football Pitch" style={{ width: '100px', height: '100px' }} />
//         <svg height="100" width="100" style={{ position: 'absolute', top: 0, left: 0 }}>
//           <circle cx={selectedCoordinates.x} cy={selectedCoordinates.y} r="5" fill="red" />
//         </svg>
//       </div>
//       <div>
//         <select defaultValue={`${ballLocation[0]?.eventType}-${0}`} onChange={handleSelectChange} style={{color: 'black'}}> 
//           {ballLocation.map((location, index) => (
//             <option key={index} value={`${location.eventType}-${index}`}> 
//               {`${location.eventType} ${index}`} (x: {location.coordinates.x}, y: {location.coordinates.y})
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

//export default App;

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import footballpitch from './assets/footballpitch.jpg';

function App() {
  const [ballLocation, setBallLocation] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState({ x: 50, y: 50 });
  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const [teams, setTeams] = useState([]);
  const loopRef = useRef();
  const loopIndexRef = useRef(0);


  useEffect(() => {
    // Fetch the ball data from the JSON file
    fetch('ball-data.json')
      .then(response => response.json())
      .then(data => {
        setBallLocation(data[0].match.ballLocation)
        setTeams(data[0].match.teams);
      });
  }, []);

  const getPlayerName = (id) => {
    
    for (let team of teams) {
      for (let player of team.players) {
        let splitPlayerId = id.split('/')[1];
        if (player.playerId === splitPlayerId) {
          return player.name;
        }
      }
    }
    return 'Unknown';
  };

  const handleSelectChange = (event) => {
    const selectedLocation = ballLocation[parseInt(event.target.value.split('-')[1])];
    setSelectedCoordinates(selectedLocation.coordinates);
    event.target.style.color = 'black';
  };

  const handleButtonClick = () => {
    if (isLoopRunning) {
      clearInterval(loopRef.current);
    } else {
      loopRef.current = setInterval(() => {
        setSelectedCoordinates(ballLocation[loopIndexRef.current].coordinates);
        loopIndexRef.current++;
        if (loopIndexRef.current >= ballLocation.length) {
          clearInterval(loopRef.current);
          setIsLoopRunning(false);
          loopIndexRef.current = 0;
        }
      }, 1000);
    }
    setIsLoopRunning(!isLoopRunning);
  };

  const handleBackClick = () => {
    loopIndexRef.current = Math.max(0, loopIndexRef.current - 1);
    setSelectedCoordinates(ballLocation[loopIndexRef.current].coordinates);
  };

  const handleForwardClick = () => {
    loopIndexRef.current = Math.min(ballLocation.length - 1, loopIndexRef.current + 1);
    setSelectedCoordinates(ballLocation[loopIndexRef.current].coordinates);
  };


  return (

    <div className="flex flex-col items-center justify-center space-y-4 border border-black bg-blue-900 text-white">
      <div className="text-center">
        <p>In-Play Football</p>
      </div>
      <div>
        <p>X v Y</p>
      </div>
      <div className="flex justify-center space-x-4 border border-black">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 1
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 2
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 3
        </button>
      </div>
      <div className="flex justify-center space-x-4 border border-black">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 4
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 5
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 6
        </button>
      </div>
      <div className="border border-black relative">
        <img src={footballpitch} alt="Football Pitch" style={{ width: '100px', height: '100px' }} />
        <svg height="100" width="100" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx={selectedCoordinates.x} cy={selectedCoordinates.y} r="5" fill="red" />
        </svg>
      </div>
      <div>
        <select defaultValue={`${ballLocation[0]?.eventType}-${0}`} onChange={handleSelectChange} style={{ color: 'black' }}>
          {ballLocation.map((location, index) => (
            <option key={index} value={`${location.eventType}-${index}`}>
              {`${location.eventType} ${index}`} (x: {location.coordinates.x}, y: {location.coordinates.y})
            </option>
          ))}
        </select>
        <button onClick={handleBackClick} style={{ color: 'black' }}>Back</button>
        <button onClick={handleForwardClick} style={{ color: 'black' }}>Forward</button>
        <button onClick={handleButtonClick} style={{ color: 'black' }}>{isLoopRunning ? 'Pause' : 'Start Loop'}</button>
        <p>Player: {getPlayerName(ballLocation[loopIndexRef.current]?.matchPlayerId)}</p>
      </div>
    </div>


  );
}

export default App;