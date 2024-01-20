import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterStep() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    gender: "",
    nationality: "",
    countryresidence: "",
    cityresidence: "",
    tel: "",
    email: "",
    login: "",
    profil: "",
    password: "",
    // Additional fields for player
    height: "",
    weight: "",
    strongSkill: "",
    positionPlay: "",
    positionSecond: "",
    skillsInProfile: "",
    // Additional fields for coach
    totalTeam: "",
    countryCoachedIn: "",
    skills: "",
    // Additional fields for agent
    totalCareerTransfers: "",
    clubCovered: "",
    totalPlayer: "",
    typeresponsable: "",
    roles: [],
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleRoleChange = (selectedRoles) => {
    setFormData({
      ...formData,
      roles: selectedRoles,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data

    try {
      const response = await fetch("http://localhost:8088/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully!");
        navigate("/login");
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <label htmlFor="nom" className="block mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.nom}
              placeholder="Enter your first name"
              required
            />
            <label>
              <input
                type="checkbox"
                value="player"
                checked={formData.roles.includes("player")}
                onChange={() => handleRoleChange(["player"])}
              />
              Player
              <input
                type="checkbox"
                value="agent"
                checked={formData.roles.includes("agent")}
                onChange={() => handleRoleChange(["agent"])}
              />
              Agent
              <input
                type="checkbox"
                value="coach"
                checked={formData.roles.includes("coach")}
                onChange={() => handleRoleChange(["coach"])}
              />
              Coach
            </label>
            <label htmlFor="prenom" className="block mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.prenom}
              placeholder="Enter your last name"
              required
            />

            <label htmlFor="tel" className="block mb-2">
              Phone:
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.tel}
              placeholder="Enter your phone number"
              required
            />

            <label htmlFor="datenaissance" className="block mb-2">
              DateN:
            </label>
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleInputChange}
              placeholder="Date de Naissance"
              className="border p-2 mb-4"
            />

            <label htmlFor="gender" className="block mb-2">
              Gender:
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="border p-2 mb-4"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="nationality" className="block mb-2">
            Nationality:
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              placeholder="Nationality"
              className="border p-2 mb-4"
            />
            <label htmlFor="countryresidence" className="block mb-2">
            Country residence:
            </label>
            <input
              type="text"
              name="countryresidence"
              value={formData.countryresidence}
              onChange={handleInputChange}
              placeholder="Country of Residence"
              className="border p-2 mb-4"
            />
             <label htmlFor="cityresidence" className="block mb-2">
            City residence:
            </label>
            <input
              type="text"
              name="cityresidence"
              value={formData.cityresidence}
              onChange={handleInputChange}
              placeholder="City of Residence"
              className="border p-2 mb-4"
            />
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="login" className="block mb-2">
              LoginUsername:
            </label>
            <input
              type="text"
              id="login"
              name="login"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.login}
              placeholder="Choose a username"
              required
            />

            <label htmlFor="profil" className="block mb-2">
              Profile:
            </label>
            <select
              id="profil"
              name="profil"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.profil}
              required
            >
              <option value="">Select Profile</option>
              <option value="player">player</option>
              <option value="agent">agent</option>
              <option value="coach">Coach</option>
            </select>

            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mb-4"
              onChange={handleInputChange}
              value={formData.password}
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white p-2"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            {formData.profil === "player" && (
              <div>
                <label htmlFor="height" className="block mb-2">
                  Height:
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.height}
                  placeholder="Enter your height in cm"
                  required
                />

                <label htmlFor="weight" className="block mb-2">
                  Weight:
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.weight}
                  placeholder="Enter your weight in kg"
                  required
                />

                <label htmlFor="strongSkill" className="block mb-2">
                  Strong Skill:
                </label>
                <input
                  type="text"
                  id="strongSkill"
                  name="strongSkill"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.strongSkill}
                  placeholder="Enter your strong skill"
                  required
                />

                <label htmlFor="positionPlay" className="block mb-2">
                  Position Play:
                </label>
                <input
                  type="text"
                  id="positionPlay"
                  name="positionPlay"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.positionPlay}
                  placeholder="Enter your preferred playing position"
                  required
                />

                <label htmlFor="positionSecond" className="block mb-2">
                  Position Second:
                </label>
                <input
                  type="text"
                  id="positionSecond"
                  name="positionSecond"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.positionSecond}
                  placeholder="Enter your secondary playing position"
                  required
                />

                <label htmlFor="skillsInProfile" className="block mb-2">
                  Skills In Profile:
                </label>
                <input
                  type="text"
                  id="skillsInProfile"
                  name="skillsInProfile"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.skillsInProfile}
                  placeholder="Enter your skills, separated by commas"
                  required
                />
              </div>
            )}
            {formData.profil === "coach" && (
              <div>
                <label htmlFor="totalTeam" className="block mb-2">
                  numeber team coched:
                </label>
                <input
                  type="number"
                  id="totalTeam"
                  name="totalTeam"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.totalTeam}
                  placeholder="Enter your totalTeam "
                  required
                />

                <label htmlFor="countryCoachedIn" className="block mb-2">
                country Coached In:
                </label>
                <input
                  type="number"
                  id="countryCoachedIn"
                  name="countryCoachedIn"
                  className="w-full p-2 mb-4"
                  onChange={handleInputChange}
                  value={formData.countryCoachedIn}
                  placeholder="Enter your weight in kg"
                  required
                />

                
              </div>
            )}
{formData.profil === 'agent' && (
  // Agent fields
  <div>
  

<label htmlFor="typeresponsable" className="block mb-2">
  Type Responsable:
</label>
<select
  id="typeresponsable"
  name="typeresponsable"
  className="w-full p-2 mb-4"
  onChange={handleInputChange}
  value={formData.typeresponsable}
  required
>
  <option value="">Select Type Responsable</option>
  <option value="club">Club</option>
  <option value="players">Players</option>
</select>


{formData.typeresponsable && (
  <div>
    {formData.typeresponsable === 'club' && (
      // Fields specific to Club
      <div>
        <label htmlFor="totalCareerTransfers" className="block mb-2">
          Total Career Transfers:
        </label>
        <input
          type="text"
          id="totalCareerTransfers"
          name="totalCareerTransfers"
          className="w-full p-2 mb-4"
          onChange={handleInputChange}
          value={formData.totalCareerTransfers}
          placeholder="Enter total career transfers for club"
          required
        />

        <label htmlFor="clubCovered" className="block mb-2">
          Club Covered:
        </label>
        <input
          type="text"
          id="clubCovered"
          name="clubCovered"
          className="w-full p-2 mb-4"
          onChange={handleInputChange}
          value={formData.clubCovered}
          placeholder="Enter club covered"
          required
        />
      </div>
    )}

    {formData.typeresponsable === 'players' && (
      // Fields specific to Players
      <div>
        <label htmlFor="totalPlayer" className="block mb-2">
          Total Players:
        </label>
        <input
          type="text"
          id="totalPlayer"
          name="totalPlayer"
          className="w-full p-2 mb-4"
          onChange={handleInputChange}
          value={formData.totalPlayer}
          placeholder="Enter total players managed"
          required
        />
      </div>
    )}
  </div>
)}

  </div>
)}

            <button
              type="button"
              onClick={handlePrevStep}
              className="mr-2 bg-gray-500 text-white p-2"
            >
              Previous
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterStep;
