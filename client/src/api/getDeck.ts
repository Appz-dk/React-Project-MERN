import { API_URL } from "./config";
import { TDeck } from "./getDecks";


export async function getDeck(deckId: string): Promise<TDeck> {
   // Maybe a valid guard clause
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
}
