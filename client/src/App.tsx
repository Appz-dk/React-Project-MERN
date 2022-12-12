import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  // Fetch all Decks from database on page mount
  useEffect(() => {
    const fetchDecks = async (url: string) => {
      const response = await fetch(url);
      const decks = await response.json();
      // Store decks in state
      setDecks(decks);
    };

    fetchDecks(`${API_URL}/decks`);
  }, []);

  const handleDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit Form to backend
    await fetch(`${API_URL}/decks`, {
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
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
        ))}
      </ul>
      <form onSubmit={handleDeckSubmit}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title" value={title} onChange={handleTitleChange} />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
