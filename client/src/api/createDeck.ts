import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function createDeck(title: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  //   const newDeck = await response.json();
  return response.json();
}
