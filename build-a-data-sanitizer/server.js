import express from "express";
import path from "path";
import { inputCleaner, inputValidator } from "./middleware.js";

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(3000, () => {
    console.log("Gate Open...");
});
app.get("/", (req, res) => {
    res.redirect('/form');
});
app.get("/form", (req, res) => {
    const err = req.query.error || '';
    //console.log(err);
    res.sendFile(path.resolve("public", "index.html"));
});
app.post("/submit", inputCleaner, inputValidator,  (req, res) => {
    //console.log(req.body);
    const {username , comment} = req.body;
    res.json({
        username: username, 
        comment: comment
    });
});