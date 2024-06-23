import footballpitch from '../assets/footballpitch.jpg';
import React, { useRef, useState, useEffect } from 'react';


function Pitch({ ballLocationData, teams }) {
  //Sort time ascending order, earliest first
  ballLocationData.sort((a, b) => a.clockTime - b.clockTime);

  const [selectedCoordinates, setSelectedCoordinates] = useState({ x: 50, y: 50 });

  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const loopRef = useRef();
  const loopIndexRef = useRef(0);

  const getPlayerName = (id) => {

    for (let team of teams) {
      for (let player of team.players) {
                // Split the ID on the '/' character and get the second part
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
        setSelectedCoordinates(ballLocationData[loopIndexRef.current].coordinates);
        loopIndexRef.current++;
        if (loopIndexRef.current >= ballLocationData.length) {
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
    setSelectedCoordinates(ballLocationData[loopIndexRef.current].coordinates);
  };

  const handleForwardClick = () => {
    loopIndexRef.current = Math.min(ballLocationData.length - 1, loopIndexRef.current + 1);
    setSelectedCoordinates(ballLocationData[loopIndexRef.current].coordinates);
  };


  return (
    <div className="border border-black relative">
      <p>Player: {getPlayerName(ballLocationData[loopIndexRef.current]?.matchPlayerId)}</p>
      <p>Clock Time: {Math.floor(ballLocationData[loopIndexRef.current]?.clockTime / 60)}:{(ballLocationData[loopIndexRef.current]?.clockTime % 60).toString().padStart(2, '0')}</p>      <div className="flex justify-center items-center border border-black relative">
        <img src={footballpitch} alt="Football Pitch" style={{ width: '100%', height: '100%' }} />
        <svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx={selectedCoordinates.x} cy={selectedCoordinates.y} r="5" fill="red" />
        </svg>
      </div>
      <div>
      </div>
      <button onClick={handleBackClick} style={{ color: 'black' }}>Back</button>
      <button onClick={handleForwardClick} style={{ color: 'black' }}>Forward</button>
      <button onClick={handleButtonClick} style={{ color: 'black' }}>{isLoopRunning ? 'Pause' : 'Start Match'}</button>
    </div>
  )
}

export default Pitch;