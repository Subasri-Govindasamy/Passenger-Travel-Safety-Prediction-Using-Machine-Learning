import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

// List of major Indian cities for dropdowns
const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Bhopal",
  "Indore",
  "Coimbatore",
  "Nagpur",
  "Patna",
  "Surat",
  "Visakhapatnam",
];

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    heartDisease: "No",
    mobilityIssues: "No",
    hypertension: "No",
    respiratoryIssues: "No",
    travelMode: "",
    departure: "",
    destination: "",
    weather: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction", error);
    }
  };

  return (
    <div className="container">
      <h2>Enter Travel Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Heart Disease:</label>
        <select
          name="heartDisease"
          value={formData.heartDisease}
          onChange={handleChange}
          required
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Mobility Issues:</label>
        <select
          name="mobilityIssues"
          value={formData.mobilityIssues}
          onChange={handleChange}
          required
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Hypertension:</label>
        <select
          name="hypertension"
          value={formData.hypertension}
          onChange={handleChange}
          required
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Respiratory Issues:</label>
        <select
          name="respiratoryIssues"
          value={formData.respiratoryIssues}
          onChange={handleChange}
          required
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Travel Mode:</label>
        <select
          name="travelMode"
          value={formData.travelMode}
          onChange={handleChange}
          required
        >
          <option value="">Select Mode</option>
          <option value="Air">Air</option>
          <option value="Train">Train</option>
          <option value="Road">Road</option>
          <option value="Ship">Ship</option>
        </select>

        <label>Departure City:</label>
        <select
          name="departure"
          value={formData.departure}
          onChange={handleChange}
          required
        >
          <option value="">Select Departure</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label>Destination City:</label>
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

        <label>Weather Conditions:</label>
        <select
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          required
        >
          <option value="">Select Weather</option>
          <option value="Clear">Clear</option>
          <option value="Rainy">Rainy</option>
          <option value="Stormy">Stormy</option>
        </select>

        <button type="submit" className="btn btn-success">
          Get Prediction
        </button>
      </form>

      {prediction && (
        <div className="alert alert-info">
          <h3>Prediction Result:</h3>
          <p>{prediction.message}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
