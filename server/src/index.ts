import express, { Request, Response } from "express"
import mongoose, { mongo } from 'mongoose';
import cors from "cors"

import * as dotenv from 'dotenv' 
dotenv.config()

import { getDecksController } from "./Controllers/getDecksController";
import { createDeckController } from "./Controllers/createDeckController";
import { deleteDeckController } from "./Controllers/deleteDeckController";
import { createCardForDeckController } from "./Controllers/createCardForDeckController";
import { getDeckController } from "./Controllers/getDeckController";

const PORT = 5000

const app = express()

const corsOptions = {
    origin: ["http://localhost:5173", "https://www.thunderclient.com"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Use of middleware functions
app.use(express.json())
app.use(cors(corsOptions))

app.get("/decks", getDecksController)
app.post("/decks", createDeckController)
app.delete("/decks/:deckId", deleteDeckController)

app.get("/decks/:deckId", getDeckController)
app.post("/decks/:deckId/cards", createCardForDeckController)

const db = mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    app.listen(PORT)
    console.log(`Listening on Port:${PORT}`)
})


