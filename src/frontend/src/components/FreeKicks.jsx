import React from 'react';
import footballpitch from '../assets/footballpitch.jpg';

const FreeKicks = ({ ballData }) => {
    const freeKicksData = ballData.filter((kick) => kick.eventType === 'FREE_KICK');

    return (
        <div className="border border-black relative">
            <div className="flex justify-center items-center border border-black relative">
                <img src={footballpitch} alt="Football Pitch" style={{ width: '100%', height: '100%' }} />
                <svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {freeKicksData.map((kick, index) => (
                        <circle
                            key={index}
                            cx={kick.coordinates.x}
                            cy={kick.coordinates.y}
                            r="5"
                            fill={kick.association === 'HOME' ? 'blue' : 'red'}
                        />
                    ))}
                </svg>
            </div>
            <div className="flex justify-center mt-2">
                <div className="flex items-center mr-4">
                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                    <span>Home</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    <span>Away</span>
                </div>
            </div>
        </div>
    );
};

export default FreeKicks;


