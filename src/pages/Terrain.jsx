import React from 'react'
import TER from "../assets/terreain.png"
import './Terreain.css'; 

function Terrain() {
  // Define the positions of players on the field with coordinates
  const playerPositions = [
    { position: 'GK', top: '10%', left: '50%' },    // Goalkeeper
    { position: 'DF', top: '30%', left: '20%' },    // Defender
    { position: 'DF', top: '30%', left: '80%' },    // Defender
    { position: 'MF', top: '50%', left: '20%' },    // Midfielder
    { position: 'MF', top: '50%', left: '50%' },    // Midfielder
    { position: 'MF', top: '50%', left: '80%' },    // Midfielder
    { position: 'MF', top: '70%', left: '20%' },    // Midfielder
    { position: 'FW', top: '70%', left: '80%' },    // Forward
    { position: 'FW', top: '90%', left: '50%' },    // Forward
    // Add more positions as needed
  ];

  return (
    <div className="container mt-3 position-relative">
      <img src={TER} alt="Terrain Image" className="img-fluid" />

      <div className="position-absolute top-0 start-0 end-0 bottom-0">
        {playerPositions.map((player, index) => (
          <div
            key={index}
            className={`player-position bg-primary text-white rounded-circle p-2 position-absolute`}
            style={{ top: player.top, left: player.left }}
          >
            {player.position}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terrain;
