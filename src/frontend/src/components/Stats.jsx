import React, { useState } from 'react';

function Stats({ ballLocation }) {
    const [selectedAssociation, setSelectedAssociation] = useState('ALL');

    const filteredBallLocation = ballLocation.filter(curr => selectedAssociation === 'ALL' || curr.association === selectedAssociation);

    const stats = filteredBallLocation.reduce((acc, curr) => {
        if (curr.eventType === 'PASS' || curr.eventType === 'THROW_IN' || curr.eventType === 'INTERCEPTION' || curr.eventType === 'GOAL' || curr.eventType === 'TACKLE') {
            acc[curr.eventType] = (acc[curr.eventType] || 0) + 1;
        }
        return acc;
    }, {});

    return (
        <div>
             <select value={selectedAssociation} onChange={e => setSelectedAssociation(e.target.value)} className="text-black">
                <option value="ALL">All</option>
                <option value="HOME">Home</option>
                <option value="AWAY">Away</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Event Type</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(stats).map(([eventType, count]) => (
                        <tr key={eventType}>
                            <td>{eventType}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
    );
}

export default Stats;