import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function createCard(text: string, deckId: string): Promise<string> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  //   const newDeck = await response.json();
  return response.json();
}
