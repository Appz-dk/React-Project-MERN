import { useEffect, useState } from "react";
import { TDeck } from "../api/getDecks";
import { useParams } from "react-router-dom";
import { createCard } from "../api/createCard";
import { getDeck } from "../api/getDeck";
import "../App.css";
import Decks from "./Decks";
import Cards from "./Cards";

const Deck = () => {
  const { deckId } = useParams();
  const [text, setText] = useState("");
  const [cards, setCards] = useState<string[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
  };

  // Fetch all Decks from database on page mount
  useEffect(() => {
    async function fetchDecks() {
      const { cards: databaseCards } = await getDeck(deckId || "");
      setCards(databaseCards);
    }
    fetchDecks();
  }, []);

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create new deck in database
    const newCard = await createCard(text, deckId || ""); // Improve Type ??
    // Update decks state to rerender page
    setCards((cards) => [...cards, newCard]);
    // // Clear title state
    setText("");
  };

  // const handleDeleteDeck = async (deckId: string) => {
  //   // Delete deck from database
  //   await deleteDeck(deckId);
  //   // Optimistic rerendering of page
  //   setDecks((decks) => decks.filter((deck) => deck._id !== deckId));
  // };

  return (
    <div className="App">
      <ul className="decks">
        <Cards cards={cards} deckId={deckId!} />
      </ul>
      <form onSubmit={handleCardSubmit}>
        <label htmlFor="card-text">Card Text</label>
        <input id="card-text" value={text} onChange={handleTextChange} />
        <button>Create Card</button>
      </form>
    </div>
  );
};

export default Deck;
