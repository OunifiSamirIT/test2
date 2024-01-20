import React, { useEffect, useState } from 'react'
import IMG1 from "../../public/asstes/images/home-01/team-01.jpg"
import IMG2 from "../../public/asstes/images/home-01/pattern-04.png"
import TER from "../assets/terreain.png"
import './Terreain.css'; 
import { useParams } from 'react-router-dom';
function PlayerInfo() {

  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/player/${id}`);
        const data = await response.json();
        setUserInfo(data);
      } catch (error) { 
        console.error('Error fetching user information:', error);
      }
    };
    console.log(userInfo)
    fetchUserInfo();
  }, [id]);

  if (!userInfo) {
    // You can render a loading state here
    return <p>Loading...</p>;
  }
  const isPlayerProfile = storedUserData && storedUserData.profil === "player";










    const playerPositions = [
        { position: 'GK', top: '50%', left: '10%' },    // Goalkeeper
        { position: 'DF', top: '10%', left: '30%' },    // Defender
        { position: 'DF', top: '80%', left: '30%' },    // Defender
        { position: 'MF', top: '30%', left: '20%' },    // Midfielder
        { position: 'MF', top: '20%', left: '50%' },    // Midfielder
        { position: 'MF', top: '30%', left: '80%' },    // Midfielder
        { position: 'MF', top: '60%', left: '20%' },    // Midfielder
        { position: 'FW', top: '50%', left: '80%' },    // Forward
        { position: 'FW', top: '70%', left: '50%' },    // Forward
        // Add more positions as needed
      ];
    
  return (
   <>{isPlayerProfile && (  <div className='h-full'>
  <section className="space-ptb single-player">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="player-img">
                  <img className="img-fluid" src={IMG1} alt=""/>
                </div>
              </div>
              <div className="col-lg-7 mt-4 mt-md-5 mt-lg-0 ps-3 ps-lg-5">
                <div className="player-info">
                  <h2 className="mb-2">
                    Player Name :  <a href="#" className="player-name text-white text-2xl">
                    {userInfo?.user?.nom} {userInfo?.user?.prenom}
                    </a>
                  </h2>
                  <span className="d-block player-position"> Postion Play :{userInfo.positionPlay}</span>
                  <br/>
                  
                    <ul className="list-unstyled mt-4">
                      {/* Display player-specific information */}
                      <li className="d-flex mb-3 mx-0 text-2xl">
                        <span className="me-4 ">Nationality :</span>{userInfo?.user?.nationality}
                      </li>
                      <li className="d-flex mb-3 mx-0">
                        <span className="me-4">skills :</span>
                        
                        <ul>
                          <li> skills default :  {userInfo.skillsInProfile}</li>
                        <li> strong skill :      {userInfo.strongSkill}</li>
                       
                        </ul>
                        
                        
                        {userInfo.currentTeam}
                      </li> <ul>
                          <li> Height :  {userInfo.height} cm</li>
                        <li> Weight :      {userInfo.weight} kg</li>
                       
                        </ul>
                      {/* Add more user information properties as needed */}
                    </ul>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
   <div className="container mt-3 position-relative">
     <img src={TER} alt="Terrain Image" className="img-fluid" />
     <div className="position-absolute top-0 start-0 end-0 bottom-0">
       {playerPositions.map((player, index) => (
         <div
           key={index}
           className={`player-position ${player.position === 'FW' ? 'bg-blue' : 'bg-primary'} text-white rounded-circle p-2 position-absolute`}
           style={{ top: player.top, left: player.left }}
         >
           {player.position}
         </div>
       ))}
     </div>
   </div>
   <section className="player-about">
     <div className="player-about-bg">
       <div className="container">
         <div className="row">
           <div className="col-xl-6">
             <div className="player-about-details">
               <h2>About Player</h2>
               <div className="mb-4">
                 <span className="text-white">Biography</span>
               </div>
               <p className="text-white">{userInfo.biography}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
 </div>)}
    </>
  )
}

export default PlayerInfo
