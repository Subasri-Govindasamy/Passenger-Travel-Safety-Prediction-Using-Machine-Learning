import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Passenger Travel Safety Prediction</h1>
      <p>Check if your journey is safe based on various risk factors.</p>
      <Link to="/predict" className="btn btn-primary">
        Check Safety
      </Link>
    </div>
  );
};

export default Home;
