import React, { useState } from "react";
import "./BudgetChecker.css";

const BudgetChecker = () => {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [fetchedPrice, setFetchedPrice] = useState(null);
  const [editedPrice, setEditedPrice] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [affordabilityResult, setAffordabilityResult] = useState(null);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowOptions(true);
      setFetchedPrice(100); // Placeholder price (Replace with API later)
      setEditedPrice(100);
      setItemName(""); // Clear previous item name
    }
  };

  // Function to handle logging as an expense
  const handleLogExpense = () => {
    setShowOptions(false);
    setShowExpenseForm(true);
  };

  // Function to handle checking affordability
  const handleCheckAffordability = () => {
    const userBudget = 500; // Replace with actual budget from user settings
    if (fetchedPrice <= userBudget) {
      setAffordabilityResult(" You can afford this item!");
    } else {
      setAffordabilityResult(" This item exceeds your budget.");
    }
    setShowOptions(false);
  };

  return (
    <div className="budget-checker-container">
      <h2>Item Budget Checker</h2>
      
      {!image && (
        <div className="upload-box">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}

      {image && <img src={image} alt="Uploaded Item" className="uploaded-image" />}

      {showOptions && (
        <div className="options">
          <button className="log-expense-btn" onClick={handleLogExpense}> Log as an Expense</button>
          <button className="check-afford-btn" onClick={handleCheckAffordability}> Check Affordability</button>
        </div>
      )}

      {showExpenseForm && (
        <div className="expense-form">
          <label> Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />

          <label> Price:</label>
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
          />

          <button className="save-btn"> Save Expense</button>
        </div>
      )}

      {affordabilityResult && (
        <div className="affordability-result">
          <p>{affordabilityResult}</p>
        </div>
      )}

      {image && (
        <div className="bottom-buttons">
          <button className="reupload-btn" onClick={() => setImage(null)}>🔄 Reupload</button>
          <button className="go-back-btn" onClick={() => window.history.back()}>⬅️ Go Back</button>
        </div>
      )}
    </div>
  );
};

export default BudgetChecker;
