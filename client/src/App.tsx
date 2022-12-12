import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit Form to backend
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    // Clear title state
    setTitle("");
  };

  return (
    <div className="App">
      <form onSubmit={handleDeckSubmit}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title" value={title} onChange={handleTitleChange} />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
