import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import your styling here

function App() {
  const [name, setName] = useState(""); // State for the input name
  const [country, setCountry] = useState(null); // State to store the fetched country data
  const inputRef = useRef(); // Ref to focus the input field automatically

  // Focus the input field
  useEffect(() => {}, []);

  // Function to handle API fetch on form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Fetch data from the API
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await response.json();
    const countryData = data.country ? data.country[0] : null;
    setCountry(countryData); // Set the country data into state
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Nationality Predictor</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => setName(event.target.value)} // Update state on input change
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ marginTop: "20px" }}
          >
            Predict Nationality
          </button>
        </div>
      </form>

      {country && (
        <div className="alert alert-info">
          <h4 className="alert-heading">Predicted Nationality:</h4>
          <p>
            Country Code: <strong>{country.country_id}</strong>
          </p>
          <p>
            Probability:{" "}
            <strong>{(country.probability * 100).toFixed(2)}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
