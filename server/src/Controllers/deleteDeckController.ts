import { Request, Response } from "express"
import Deck from "../Models/Deck"

export const deleteDeckController = async (req: Request, res: Response) => {
    // Get deckId from url
    const {deckId} = req.params
    // Delete deck from database
    const deletedDeck = await Deck.findByIdAndDelete(deckId)
    // Send back deleted deck
    res.json(deletedDeck)
}