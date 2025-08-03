import React, { useState } from "react";
import "./App.css";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    source: "",
    destination: "",
    weather: "",
    mode: "",
    heartDisease: "No",
    mobilityIssues: "No",
    hypertension: "No",
    respiratoryIssues: "No",
    severity: "Minor",
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSafe, setIsSafe] = useState(true);
  /*const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");*/

  // Predefined weather conditions
  const weatherConditions = {
    "Delhi-Chennai": "Clear ☀️",
    "Chennai-Delhi": "Clear ☀️",
    "Delhi-Hyderabad": "Rainy 🌧️",
    "Hyderabad-Delhi": "Rainy 🌧️",
    "Delhi-Pune": "Stormy ⛈️",
    "Pune-Delhi": "Stormy ⛈️",
    "Delhi-Jaipur": "Cloudy ⛅",
    "Jaipur-Delhi": "Cloudy ⛅",
    "Delhi-Mumbai": "Foggy 🌫️",
    "Mumbai-Delhi": "Foggy 🌫️",
    "Delhi-Kolkata": "Humid 🌡️",
    "Kolkata-Delhi": "Humid 🌡️",
    "Delhi-Bengaluru": "Sunny ☀️",
    "Bengaluru-Delhi": "Sunny ☀️",
    "Delhi-Ahmedabad": "Windy 💨",
    "Ahmedabad-Delhi": "Windy 💨",
    "Delhi-Lucknow": "Cool 🌥️",
    "Lucknow-Delhi": "Cool 🌥️",
    "Delhi-Coimbatore": "Hot 🔥",
    "Coimbatore-Delhi": "Hot 🔥",

    "Chennai-Hyderabad": "Rainy 🌧️",
    "Hyderabad-Chennai": "Rainy 🌧️",
    "Chennai-Pune": "Stormy ⛈️",
    "Pune-Chennai": "Stormy ⛈️",
    "Chennai-Jaipur": "Cloudy ⛅",
    "Jaipur-Chennai": "Cloudy ⛅",
    "Chennai-Mumbai": "Foggy 🌫️",
    "Mumbai-Chennai": "Foggy 🌫️",
    "Chennai-Kolkata": "Humid 🌡️",
    "Kolkata-Chennai": "Humid 🌡️",
    "Chennai-Bengaluru": "Sunny ☀️",
    "Bengaluru-Chennai": "Sunny ☀️",
    "Chennai-Ahmedabad": "Windy 💨",
    "Ahmedabad-Chennai": "Windy 💨",
    "Chennai-Lucknow": "Cool 🌥️",
    "Lucknow-Chennai": "Cool 🌥️",
    "Chennai-Coimbatore": "Hot 🔥",
    "Coimbatore-Chennai": "Hot 🔥",

    "Hyderabad-Pune": "Rainy 🌧️",
    "Pune-Hyderabad": "Rainy 🌧️",
    "Hyderabad-Jaipur": "Cloudy ⛅",
    "Jaipur-Hyderabad": "Cloudy ⛅",
    "Hyderabad-Mumbai": "Foggy 🌫️",
    "Mumbai-Hyderabad": "Foggy 🌫️",
    "Hyderabad-Kolkata": "Humid 🌡️",
    "Kolkata-Hyderabad": "Humid 🌡️",
    "Hyderabad-Bengaluru": "Sunny ☀️",
    "Bengaluru-Hyderabad": "Sunny ☀️",
    "Hyderabad-Ahmedabad": "Windy 💨",
    "Ahmedabad-Hyderabad": "Windy 💨",
    "Hyderabad-Lucknow": "Cool 🌥️",
    "Lucknow-Hyderabad": "Cool 🌥️",
    "Hyderabad-Coimbatore": "Hot 🔥",
    "Coimbatore-Hyderabad": "Hot 🔥",

    "Pune-Jaipur": "Rainy 🌧️",
    "Jaipur-Pune": "Rainy 🌧️",
    "Pune-Mumbai": "Stormy ⛈️",
    "Mumbai-Pune": "Stormy ⛈️",
    "Pune-Kolkata": "Cloudy ⛅",
    "Kolkata-Pune": "Cloudy ⛅",
    "Pune-Bengaluru": "Foggy 🌫️",
    "Bengaluru-Pune": "Foggy 🌫️",
    "Pune-Ahmedabad": "Humid 🌡️",
    "Ahmedabad-Pune": "Humid 🌡️",
    "Pune-Lucknow": "Sunny ☀️",
    "Lucknow-Pune": "Sunny ☀️",
    "Pune-Coimbatore": "Windy 💨",
    "Coimbatore-Pune": "Windy 💨",

    "Jaipur-Mumbai": "Rainy 🌧️",
    "Mumbai-Jaipur": "Rainy 🌧️",
    "Jaipur-Kolkata": "Stormy ⛈️",
    "Kolkata-Jaipur": "Stormy ⛈️",
    "Jaipur-Bengaluru": "Cloudy ⛅",
    "Bengaluru-Jaipur": "Cloudy ⛅",
    "Jaipur-Ahmedabad": "Foggy 🌫️",
    "Ahmedabad-Jaipur": "Foggy 🌫️",
    "Jaipur-Lucknow": "Humid 🌡️",
    "Lucknow-Jaipur": "Humid 🌡️",
    "Jaipur-Coimbatore": "Sunny ☀️",
    "Coimbatore-Jaipur": "Sunny ☀️",

    "Mumbai-Kolkata": "Rainy 🌧️",
    "Kolkata-Mumbai": "Rainy 🌧️",
    "Mumbai-Bengaluru": "Stormy ⛈️",
    "Bengaluru-Mumbai": "Stormy ⛈️",
    "Mumbai-Ahmedabad": "Cloudy ⛅",
    "Ahmedabad-Mumbai": "Cloudy ⛅",
    "Mumbai-Lucknow": "Foggy 🌫️",
    "Lucknow-Mumbai": "Foggy 🌫️",
    "Mumbai-Coimbatore": "Humid 🌡️",
    "Coimbatore-Mumbai": "Humid 🌡️",

    "Kolkata-Bengaluru": "Rainy 🌧️",
    "Bengaluru-Kolkata": "Rainy 🌧️",
    "Kolkata-Ahmedabad": "Stormy ⛈️",
    "Ahmedabad-Kolkata": "Stormy ⛈️",
    "Kolkata-Lucknow": "Cloudy ⛅",
    "Lucknow-Kolkata": "Cloudy ⛅",
    "Kolkata-Coimbatore": "Foggy 🌫️",
    "Coimbatore-Kolkata": "Foggy 🌫️",

    "Bengaluru-Ahmedabad": "Rainy 🌧️",
    "Ahmedabad-Bengaluru": "Rainy 🌧️",
    "Bengaluru-Lucknow": "Stormy ⛈️",
    "Lucknow-Bengaluru": "Stormy ⛈️",
    "Bengaluru-Coimbatore": "Cloudy ⛅",
    "Coimbatore-Bengaluru": "Cloudy ⛅",

    "Ahmedabad-Lucknow": "Foggy 🌫️",
    "Lucknow-Ahmedabad": "Foggy 🌫️",
    "Ahmedabad-Coimbatore": "Sunny ☀️",
    "Coimbatore-Ahmedabad": "Sunny ☀️",

    "Lucknow-Coimbatore": "Windy 💨",
    "Coimbatore-Lucknow": "Windy 💨",
  };

  const cities = [
    "Delhi",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Jaipur",
    "Mumbai",
    "Kolkata",
    "Bengaluru",
    "Ahmedabad",
    "Lucknow",
    "Coimbatore",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    setFormData(updatedForm);

    // Weather prediction logic
    if (name === "source" || name === "destination") {
      const pair = `${updatedForm.source}-${updatedForm.destination}`;
      const reversePair = `${updatedForm.destination}-${updatedForm.source}`;

      if (weatherConditions[pair]) {
        setFormData((prev) => ({ ...prev, weather: weatherConditions[pair] }));
      } else if (weatherConditions[reversePair]) {
        setFormData((prev) => ({
          ...prev,
          weather: weatherConditions[reversePair],
        }));
      } else {
        setFormData((prev) => ({ ...prev, weather: "Unknown ❓" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.message) {
      setPopupMessage(result.message);
      setIsSafe(result.prediction === 1);
      setShowPopup(true);

      const audio = new Audio(
        result.prediction === 1 ? "/success.wav" : "/warning.wav"
      );
      audio.play();
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="container">
      <h1>
        🌍 Passenger Travel Safety Prediction System Using Machine LearningS 🚀
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <fieldset>
          <legend>🧑‍💼 Personal Details</legend>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>👤 Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>🎂 Age:</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* Travel Details */}
        <fieldset>
          <legend>✈️ Travel Details</legend>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>📍 Source:</label>
                </td>
                <td>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Source</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>🚩 Destination:</label>
                </td>
                <td>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Destination</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>🌦️ Weather:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="weather"
                    value={formData.weather}
                    readOnly
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>🛫 Mode of Travel:</label>
                </td>
                <td>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                  >
                    required
                    <option value="">Select Mode</option>
                    <option value="Air ✈️">Air ✈️</option>
                    <option value="Train 🚆">Train 🚆</option>
                    <option value="Road 🚗">Road 🚗</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* Health Conditions */}
        <fieldset>
          <legend>❤️ Health Conditions</legend>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>💔 Heart Disease:</label>
                </td>
                <td>
                  <select
                    name="heartDisease"
                    value={formData.heartDisease}
                    onChange={handleChange}
                  >
                    <option value="No">No ❌</option>
                    <option value="Yes">Yes ✅</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>♿ Mobility Issues:</label>
                </td>
                <td>
                  <select
                    name="mobilityIssues"
                    value={formData.mobilityIssues}
                    onChange={handleChange}
                  >
                    <option value="No">No ❌</option>
                    <option value="Yes">Yes ✅</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>💉 Hypertension:</label>
                </td>
                <td>
                  <select
                    name="hypertension"
                    value={formData.hypertension}
                    onChange={handleChange}
                  >
                    <option value="No">No ❌</option>
                    <option value="Yes">Yes ✅</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>🌬️ Respiratory Issues:</label>
                </td>
                <td>
                  <select
                    name="respiratoryIssues"
                    value={formData.respiratoryIssues}
                    onChange={handleChange}
                  >
                    <option value="No">No ❌</option>
                    <option value="Yes">Yes ✅</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <br />
        <center>
          <div className="form-group">
            <button type="submit">🔍 Predict Safety</button>
          </div>
        </center>
      </form>
      <br></br>

      <footer className="text-center p-4">
        <p>
          🌟 Created by <strong>Subasri and Preethi from 3rd year IT</strong>
        </p>
      </footer>

      <audio id="safeAudio" src="/sucess.wav" />
      <audio id="notSafeAudio" src="/warning.wav" />

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              className="modal-message"
              style={{ textAlign: "left", lineHeight: "1.8", fontSize: "16px" }}
              dangerouslySetInnerHTML={{ __html: popupMessage }}
            ></div>

            <button
              className="modal-button"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelForm;
