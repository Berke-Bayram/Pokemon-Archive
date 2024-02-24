import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/search", async (req, res) => {
    try {
        const name = req.body.pokemonName.toLowerCase();
        const link = API_URL + name;
        const result = await axios.get(link);
        const pokemon = {
            id: result.data.id,
            name: result.data.name,
            height: result.data.height,
            weight: result.data.weight,
            abilities: result.data.abilities,
            cries: result.data.cries.latest,
            types: result.data.types,
        }
        res.render("index.ejs", { pokemon: pokemon });
    } 
    catch (error) {
        res.render("index.ejs", {
            error: error.response.data,
        })
    }
});

app.post("/random", async (req, res) => {
    try {
        // There are more than 1000 entries in the API
        const randomID = Math.floor(Math.random() * 1000) + 1;
        const link = API_URL + randomID;
        const result = await axios.get(link);
        const pokemon = {
            id: result.data.id,
            name: result.data.name,
            height: result.data.height,
            weight: result.data.weight,
            abilities: result.data.abilities,
            cries: result.data.cries.latest,
            types: result.data.types,
        }
        res.render("index.ejs", { pokemon: pokemon });
    } 
    catch (error) {
        res.render("index.ejs", {
            error: error.response.data,
        })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});