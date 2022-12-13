import { Request, Response } from "express"
import Deck from "../Models/Deck"

export const createCardForDeckController = async (req: Request, res: Response) => {
    const {text} = req.body
    const {deckId} = req.params
    const deck = await Deck.findById(deckId)

    // Guard clause
    if (!deck) return res.status(400).send("No deck with this ID")
    // add card to deck
    deck.cards.push(text)
    // Remember to save
    deck.save()
    // Return saved card to user
    res.json(deck.cards[deck.cards.length - 1])
}