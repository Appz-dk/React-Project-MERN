import { Request, Response } from "express"
import Deck from "../Models/Deck"

export const createDeckController = async (req: Request, res: Response) => {
    // const {title} = req.body

    // Create new Deck instance
    const newDeck = new Deck({
        title: req.body.title
    });
    // Save
    const createdDeck = await newDeck.save()
    // Return saved Deck to user
    res.json(createdDeck)
}