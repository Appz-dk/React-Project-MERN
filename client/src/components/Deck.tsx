import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard } from "../api/createCard";
import { deleteCard } from "../api/deleteCard";
import { getDeck } from "../api/getDeck";
import { TDeck } from "../api/getDecks";
import "../App.css";
import Cards from "./Cards";

const Deck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<TDeck | undefined>(undefined);
  const [text, setText] = useState("");
  const [cards, setCards] = useState<string[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
  };

  // Fetch Deck from database on page mount
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const deck = await getDeck(deckId);
      setDeck(deck);
      setCards(deck.cards);
    }
    fetchDeck();
  }, [deckId]);

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create new card in database
    const newCard = await createCard(text, deckId || ""); // Improve Type ??
    // Update cards state to rerender page
    setCards((cards) => [...cards, newCard]);
    // // Clear text state
    setText("");
  };

  const handleDeleteCard = async (deckId: string, index: number) => {
    // Delete deck from database
    const deck = await deleteCard(deckId, index);
    // Optimistic rerendering of page
    setCards(deck.cards);
    // Update deck state to altered deck
    setDeck(deck);
  };

  return (
    <div className="App">
      <ul className="decks">
        <Cards cards={cards} deckId={deckId!} onClick={handleDeleteCard} />
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
