import footballpitch from '../assets/footballpitch.jpg';
import React, { useRef, useState, useEffect } from 'react';


function Pitch({ ballLocation, teams }) {
  const [selectedCoordinates, setSelectedCoordinates] = useState({ x: 50, y: 50 });

  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const loopRef = useRef();
  const loopIndexRef = useRef(0);

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
    <div className="border border-black relative">
      <div className="flex justify-center items-center border border-black relative">
        <img src={footballpitch} alt="Football Pitch" style={{ width: '250px', height: '250px' }} />
        <svg height="100" width="100" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx={selectedCoordinates.x} cy={selectedCoordinates.y} r="5" fill="red" />
        </svg>
      </div>
      <div>
      </div>
      <button onClick={handleBackClick} style={{ color: 'black' }}>Back</button>
      <button onClick={handleForwardClick} style={{ color: 'black' }}>Forward</button>
      <button onClick={handleButtonClick} style={{ color: 'black' }}>{isLoopRunning ? 'Pause' : 'Start Match'}</button>
      <p>Player: {getPlayerName(ballLocation[loopIndexRef.current]?.matchPlayerId)}</p>
    </div>
  )
}

export default Pitch;