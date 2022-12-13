import { Request, Response } from "express"
import Deck from "../Models/Deck"

export const getDeckController = async (req: Request, res: Response) => {
    const {deckId} = req.params
    // Get all decks from database
    const deck = await Deck.findById(deckId)
    // Send all decks back to UI
    res.json(deck)
}