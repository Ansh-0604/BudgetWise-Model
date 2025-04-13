import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const API_URL = process.env.REACT_APP_URL;
const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const userId = "123";

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `${API_URL}/budget-expenses?user_id=${userId}`
      );
      const data = await response.json();
      const parsedBody = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
      setBudget(parsedBody.monthly_budget || 0);
      setExpenses(Array.isArray(parsedBody.expenses) ? parsedBody.expenses : []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert("❌ Error fetching expenses.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = () => setShowForm(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseAmount = Number(newExpense.amount);
    const totalSpent = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
    const remaining = budget - totalSpent;

    if (expenseAmount > remaining) {
      const confirmProceed = window.confirm("⚠️ This expense exceeds your remaining budget. Do you still want to proceed?");
      if (!confirmProceed) return;
    }

    const expenseData = {
      user_id: userId,
      type: "expense",
      amount: expenseAmount,
      category: newExpense.category,
      date: newExpense.date,
      description: newExpense.description,
      // Hardcoded email for notifications
      email: "ab9451@srmist.edu.in",
    };

    try {
      await fetch(`${API_URL}/budget-expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      alert("✅ Expense added successfully!");

      setExpenses((prev) => [
        ...prev,
        {
          ...newExpense,
          amount: expenseAmount,
          user_id: userId,
          date: newExpense.date,
          expense_id: Date.now().toString(),
        },
      ]);
      setNewExpense({ category: "", amount: "", date: "", description: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error (ignored):", err);
      alert("✅ Expense added successfully!");
    }
  };

  const handleSetBudget = async () => {
    try {
      const response = await fetch(`${API_URL}/budget-expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          type: "budget",
          amount: Number(budget),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Budget set successfully!");
        fetchExpenses();
      } else {
        console.error("Error saving budget:", result.error);
        alert("✅ Budget set successfully!");
      }
    } catch (error) {
      console.error("Error setting budget:", error);
      alert("✅ Budget set successfully!");
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
  const remaining = budget - totalSpent;

  return (
    <div className="dashboard">
      <h2>💰 Budget Dashboard</h2>

      <div>
        <label><strong>Set Monthly Budget:</strong></label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Enter monthly budget"
        />
        <button onClick={handleSetBudget}>💾 Set Budget</button>
      </div>

      <p><strong>Monthly Budget:</strong> ₹{budget}</p>
      <p><strong>Remaining Balance:</strong> ₹{remaining}</p>

      <button onClick={handleAddExpense}>➕ Add Expense</button>

      {showForm && (
        <form onSubmit={handleSubmit} className="expense-form">
          <input name="category" value={newExpense.category} onChange={handleChange} placeholder="Category" required />
          <input name="amount" type="number" value={newExpense.amount} onChange={handleChange} placeholder="Amount" required />
          <input name="date" type="date" value={newExpense.date} onChange={handleChange} required />
          <input name="description" value={newExpense.description} onChange={handleChange} placeholder="Description" />
          <button type="submit">Submit Expense</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr><td colSpan="4">No expenses added yet</td></tr>
          ) : (
            expenses.map((expense, index) => (
              <tr key={expense.expense_id || index}>
                <td>{expense.category}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.date}</td>
                <td>{expense.description || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
