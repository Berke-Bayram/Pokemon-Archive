import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/"
// There are more than 1000 entries in the API 
const randomID = Math.floor(Math.random() * 1000) + 1

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

// app.get("/", async (req, res) => {
//     try {
//         const result = await axios.get(API_URL);
//         console.log(result.data)
//         res.render("index.ejs", {
//             content: "test"
//         });
//     } 
//     catch (error) {
//         res.render("index.ejs", {
//             content: error.response.data,
//         })
//     }
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});