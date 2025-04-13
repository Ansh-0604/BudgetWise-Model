import React, { useState } from "react";
import "./FoodBudget.css";

const FoodBudget = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulating food analysis
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);

      setTimeout(() => {
        setResult({
          food: "🍕 Pizza",
          price: "$8.99",
          affordable: true,
        });
        setLoading(false);
      }, 2000);
    }
  };

  const handleReupload = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="food-budget-container">
      <h2>📸 Food Budget Checker</h2>

      {!image ? (
        <label className="upload-box">
          Click to Upload an Image
          <input type="file" onChange={handleUpload} accept="image/*" />
        </label>
      ) : (
        <div className="result-box">
          <img src={image} alt="Uploaded Food" className="food-image" />

          {loading ? (
            <p className="loading-text">Analyzing... 🍔🔍</p>
          ) : (
            result && (
              <div className="result-content">
                <p>Detected: {result.food}</p>
                <p>Price: {result.price}</p>
                <p>
                  Affordability:{" "}
                  {result.affordable ? "✅ You can afford this!" : "❌ Over budget!"}
                </p>
              </div>
            )
          )}

          <div className="buttons">
            <button onClick={handleReupload}>🔄 Reupload</button>
            <button onClick={() => window.history.back()}>⬅️ Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodBudget;
