import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import IMG1 from "../../public/asstes/images/home-01/team-01.jpg";
import Modal from 'react-modal';
import { useNavigate, useParams } from "react-router-dom";
import MyModal from './MyModal'; 

function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');


  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(formData.password);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setValidationError('');
    setIsModalOpen(false);
  };

  const handleNextStep = () => {
    if (!isPasswordValid()) {
      setValidationError('Password must be at least 8 characters long and include one uppercase letter and one special character');
      openModal();
      return; 
    }
  
    setStep(step + 1);
  };
  
  

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
  });
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
    setFormData({
      ...formData,
      image: e.target.files[0], 
    });
  };

  const [userInfo, setUserInfo] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const id = storedUserData.id;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/user/${id}`);
        const data = await response.json();
        setUserInfo(data);

        setFormData({
          nom: data.nom || "",
          prenom: data.prenom || "",
          date_naissance: data.date_naissance || "",
          gender: data.gender || "",
          nationality: data.nationality || "",
          countryresidence: data.countryresidence || "",
          cityresidence: data.cityresidence || "",
          tel: data.tel || "",
          login: data.login || "",
          profil: data.profil || "",
          password: "",

          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
      
    };

    fetchUserInfo();
  }, [id]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      // setIsModalOpen(true);
      return; // Don't proceed with the form submission
    }
    try {
      // Update user information
      const userResponse = await fetch(`http://localhost:8088/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!userResponse.ok) {
        console.error("User update failed.");
        // Handle the failure case for user update
        return;
      }

      // Update player information
      const playerResponse = await fetch(
        `http://localhost:8088/api/player/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            height: formData.height,
            weight: formData.weight,
            strongSkill: formData.strongSkill,
            positionPlay: formData.positionPlay,
            positionSecond: formData.positionSecond,
            skillsInProfile: formData.skillsInProfile,
            // Add other player fields as needed
          }),
        }
      );

      if (playerResponse.ok) {
        console.log("User and player information updated successfully!");
        navigate("/")      }
       else {
        console.error("Update failed.");
        // Handle other error cases
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error case, e.g., show an error message
    }
  };
 
  return (
    <>
      <div className="h-full overflow-scroll">
        <section className="space-ptb single-player">
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-lg-4">
                <div className="player-img w-96">
                  <img className="img-fluid " src={IMG1} alt="" />
                </div>
              </div> 
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-[#000] opacity-70"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                  &#8203;
                  <div
                    className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="flex justify-between px-6 pt-5 pb-2">
                      <label
                        htmlFor="name"
                        className="block font-medium text-xl text-ascent-1 text-left"
                      >
                        Edit Profile {userInfo?.user?.nom}{" "}
                        {userInfo?.user?.prenom}
                      </label>
                    </div>

                    <form
                      className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
                      onSubmit={handleSubmit}
                    >
                      {step === 1 && (
                        <div>
                          {validationError && (
                            <div className="error-message">
                              {validationError}
                            </div>
                          )}

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
                          <label
                            htmlFor="countryresidence"
                            className="block mb-2"
                          >
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

                          <div>
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
                            {validationError && (
                              <div className="error-message">
                                {validationError}
                              </div>
                            )}
                           
                             <button
                              type="button"
                              onClick={handleNextStep}
                              className="bg-blue-100 bg-blue text-white p-2"
                            >
                              Next
                            </button>
                          </div>
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

                              <label
                                htmlFor="strongSkill"
                                className="block mb-2"
                              >
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

                              <label
                                htmlFor="positionPlay"
                                className="block mb-2"
                              >
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

                              <label
                                htmlFor="positionSecond"
                                className="block mb-2"
                              >
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

                              <label
                                htmlFor="skillsInProfile"
                                className="block mb-2"
                              >
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

                              <label
                                htmlFor="countryCoachedIn"
                                className="block mb-2"
                              >
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
                          {formData.profil === "agent" && (
                            // Agent fields
                            <div>
                              <label
                                htmlFor="typeresponsable"
                                className="block mb-2"
                              >
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
                                <option value="">
                                  Select Type Responsable
                                </option>
                                <option value="club">Club</option>
                                <option value="players">Players</option>
                              </select>

                              {formData.typeresponsable && (
                                <div>
                                  {formData.typeresponsable === "club" && (
                                    // Fields specific to Club
                                    <div>
                                      <label
                                        htmlFor="totalCareerTransfers"
                                        className="block mb-2"
                                      >
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

                                      <label
                                        htmlFor="clubCovered"
                                        className="block mb-2"
                                      >
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

                                  {formData.typeresponsable === "players" && (
                                    // Fields specific to Players
                                    <div>
                                      <label
                                        htmlFor="totalPlayer"
                                        className="block mb-2"
                                      >
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
                          <button
                            type="submit"
                            className="bg-blue-500 text-white p-2"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
   
        <MyModal isOpen={isModalOpen} closeModal={closeModal} validationError={validationError} />

      </div>
    </>
  );
}

export default EditProfile;
