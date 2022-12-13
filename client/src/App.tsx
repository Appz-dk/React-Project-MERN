import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  // Fetch all Decks from database on page mount
  useEffect(() => {
    async function fetchDecks() {
      const decks = await getDecks();
      setDecks(decks);
    }
    fetchDecks();
  }, []);

  const handleDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create new deck in database
    const newDeck = await createDeck(title);
    // Update decks state to rerender page
    setDecks((decks) => [...decks, newDeck]);
    // Clear title state
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    // Delete deck from database
    await deleteDeck(deckId);
    // Optimistic rerendering of page
    setDecks((decks) => decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="App">
      <ul className="decks">
        {/* TODO: Create seperate Deck component */}
        {decks.map((deck) => (
          <li key={deck._id}>
            <button
              onClick={() => {
                handleDeleteDeck(deck._id);
              }}
            >
              X
            </button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
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
