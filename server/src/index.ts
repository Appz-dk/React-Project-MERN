import express, { Request, Response } from "express"
import mongoose from 'mongoose';

import * as dotenv from 'dotenv' 
dotenv.config()

import Deck from "./Models/Deck"

const PORT = 5000

const app = express()

// Use of middleware functions
app.use(express.json())

app.post("/decks", async (req: Request, res: Response) => {
    // const {title} = req.body

    // Create new Deck instance
    const newDeck = new Deck({
        title: req.body.title
    });
    // Save
    const createdDeck = await newDeck.save()
    // Return saved Deck to user
    res.json(createdDeck)
})

const db = mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    app.listen(PORT)
    console.log(`Listening on Port:${PORT}`)
})


