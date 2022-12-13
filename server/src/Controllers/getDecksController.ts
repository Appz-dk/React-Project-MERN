import { Request, Response } from "express"
import Deck from "../Models/Deck"

export const getDecksController = async (req: Request, res: Response) => {
    // Get all decks from database
    const decks = await Deck.find()
    // Send all decks back to UI
    res.json(decks)
}