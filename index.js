import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the view engine 

app.get("/", async (req, res) => {
  try {
    // Render index.ejs without any data for initial load
    res.render("index", { animeData: null });
  } catch (error) {
    console.error("Failed to render index.ejs:", error.message);
    res.status(500).send("Failed to render index.ejs");
  }
});

app.post("/suggestion", async (req, res) => {
  try {
    const result = await axios.get("https://api.jikan.moe/v4/random/anime");
    //console.log(result.data);
    // Pass the fetched data to index.ejs
    res.render("index", { animeData: result.data.data});
  } catch (error) {
    console.error("Failed to get suggestion:", error.message);
    res.status(500).send("Failed to get suggestion");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
