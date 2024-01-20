import React, { useState, useEffect } from "react";
import { TopBar } from "../components";
import IMG1 from "../../public/asstes/images/home-01/team-01.jpg";

const AddFriendPage = () => {
    const [players, setPlayers] = useState([]);
    const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint using the fetch API
    fetch("http://localhost:8088/api/agents")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching agents: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setAgents(data))
    .catch((error) => console.error("Error fetching agents:", error));
   
   
    fetch("http://localhost:8088/api/players")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching players: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error fetching players:", error));


      
  }, []);

  return (
    <>
      <TopBar />

      <div className="h-full overflow-scroll">
        <section className=" ">
          <div className="container">
              
                <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-1 h-full">
                  <div className="container mx-auto my-8">
                    <h1 className="text-2xl font-bold mb-4">Add Friends</h1>

                    <div className="flex flex-wrap -mx-4">
                      {players.map((player) => (
                        <div key={player.id} className="w-1/4  px-4 mb-4">
                          {/* Your card component goes here */}
                          <div key={player?.user?.id} className="mx-auto mb-4">
                            <div className=" w-60 h-80  p-4 border bg-primary rounded flex flex-col items-center transition-transform duration-300 transform hover:scale-110 cursor-pointer">
                              <img
                                src="/src/assets/pic.jpg"
                                className="h-32 w-32 rounded-full border-2 border-black mb-2"
                              />
                              <h2 className="text-lg text-white font-bold mb-2">
                                {player?.user?.nom}
                              </h2>
                              {/* Add other player information as needed */}
                              <p className="text-white">
                                {player?.user?.profil}
                              </p>
                              <p className="text-white">
                                {player?.user?.nationality}
                              </p>
                              {/* Add more player details as needed */}
                              <button className="bg-blue text-white px-2 py-2 rounded-md">
                                {" "}
                                Add Freind
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap -mx-4">
                      {agents.map((player) => (
                        <div key={player.id} className="w-1/4  px-4 mb-4">
                          {/* Your card component goes here */}
                          <div key={player?.user?.id} className="mx-auto mb-4">
                            <div className=" w-60 h-80  p-4 border bg-primary rounded flex flex-col items-center transition-transform duration-300 transform hover:scale-110 cursor-pointer">
                              <img
                                src="/src/assets/pic.jpg"
                                className="h-32 w-32 rounded-full border-2 border-black mb-2"
                              />
                              <h2 className="text-lg text-white font-bold mb-2">
                                {player?.user?.nom}
                              </h2>
                              {/* Add other player information as needed */}
                              <p className="text-white">
                                {player?.user?.profil}
                              </p>
                              <p className="text-white">
                                {player?.user?.nationality}
                              </p>
                              {/* Add more player details as needed */}
                              <button className="bg-blue text-white px-2 py-2 rounded-md">
                                {" "}
                                Add Freind
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>{" "}
          </div>
        </section>
      </div>
    </>
  );
};

export default AddFriendPage;
