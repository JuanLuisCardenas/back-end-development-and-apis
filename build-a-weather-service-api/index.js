import express from "express";
import weatherRouter from "./weather.js";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const app = express();
const PORT = 3000;

app.listen(PORT, () =>{
    console.log("Hi there, I'm active.");
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/weather", weatherRouter);
app.get("/", (req, res) => {
    //console.log("Get / <-");
    //res.status(200).send("Welcome to this API.");
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.route("/api/data")
    .get((req, res) => {
        res.json({});
    })
    .post((req, res) => {
        res.status(201).json({});
    });
app.get("/api/info", (req, res) => {
    //console.log("Yoo, GET /api/info req");
    res.status(200).json({
        name: "Weather Service API.",
        version: "1.0.0",
        endpoints: ["/api/data", "/api/greet/:name", "/api/weather/:city"]
    });
});
app.get("/api/status", (req, res) => {
    res.status(200).json({ status: 200 });
});
app.get("/docs", (req, res) =>{
    res.redirect("/api/info");
});
app.get("/api/greet/:name", (req, res) => {
    const nameP = req.params.name || "";
    res.json({
        name: nameP
    });
});