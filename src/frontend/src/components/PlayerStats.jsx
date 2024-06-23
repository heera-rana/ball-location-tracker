import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

function PlayerStats({ ballLocationPlayerData }) {
  const [selectedAssociation, setSelectedAssociation] = useState('ALL');

  const filteredballLocationData = ballLocationPlayerData.filter(curr => selectedAssociation === 'ALL' || curr.association === selectedAssociation);

  useEffect(() => {
    const traces = [];
    const eventTypes = ['Pass', 'THROW_IN', 'INTERCEPTION', 'GOAL', 'TACKLE'];

    eventTypes.forEach(eventType => {
      const filteredData = filteredballLocationData.filter(event => event.eventType === eventType);

    console.log(filteredData)

      const xCoordinates = filteredData.map(event => event.clockTime);
      const yCoordinates = filteredData.map((_, i) => i + 1);

      traces.push({
        x: xCoordinates,
        y: yCoordinates,
        mode: 'markers',
        name: `${eventType} - ${selectedAssociation}`
      });
    });

    const layout = {
      width: 800,
      height: 600,
      xaxis: {
        autorange: true,
        range: [0, Math.max(...filteredballLocationData.map(event => event.clockTime)) + 5],
        title: 'Clock Time'
      },
      yaxis: {
        title: 'Event Count'
      }
    };
    
    Plotly.newPlot('scatterGraph', traces, layout);
  }, [selectedAssociation, filteredballLocationData]);

  return (
    <div>
      <select value={selectedAssociation} onChange={e => setSelectedAssociation(e.target.value)} className="text-black">
        <option value="ALL">All</option>
        <option value="HOME">Home</option>
        <option value="AWAY">Away</option>
      </select>
      <div id="scatterGraph"></div>
    </div>
  );
}

export default PlayerStats;