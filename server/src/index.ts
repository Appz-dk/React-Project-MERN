import express, { Request, Response } from "express"
import mongoose, { mongo } from 'mongoose';
import cors from "cors"

import * as dotenv from 'dotenv' 
dotenv.config()

import Deck from "./Models/Deck"
import { getDecks } from "./Controllers/getDecksController";
import { createDeck } from "./Controllers/createDeckController";
import { deleteDeck } from "./Controllers/deleteDeckController";

const PORT = 5000

const app = express()

const corsOptions = {
    origin: ["http://localhost:5173", "https://www.thunderclient.com"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Use of middleware functions
app.use(express.json())
app.use(cors(corsOptions))

app.get("/decks", getDecks)

app.post("/decks", createDeck)

app.delete("/decks/:deckId", deleteDeck)

const db = mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    app.listen(PORT)
    console.log(`Listening on Port:${PORT}`)
})


