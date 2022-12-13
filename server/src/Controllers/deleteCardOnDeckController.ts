import { Request, Response } from "express"
import Deck from "../Models/Deck"

export const deleteCardOnDeckController = async (req: Request, res: Response) => {
    // Get deckId from url
    const {deckId, index} = req.params
    // Find deck from database
    const deck = await Deck.findById(deckId)
    // Guard clause
    if (!deck) return res.status(400).send("No deck with this ID")
    // Delete card from Deck
    deck.cards.splice(parseInt(index), 1)
    // REMEMBER TO SAVE!!
    deck.save()
    // Send back remaining cards
    res.json(deck)
}