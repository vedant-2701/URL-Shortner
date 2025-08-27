const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const urlMap = {};

const baseUrl = `http://localhost:${port}`;

function generateShortCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let length = characters.length;

    for(let i = 0; i < 6; i++)  {
        result += characters.charAt(Math.floor(Math.random() * length));
    }

    return result;
}

app.get("/", (req, res) => {
    // res.send(process.env);
    res.redirect("/shorten");
});

app.post("/shorten", (req, res) => {
    let shortCode = generateShortCode();
    let URL = req.body.url;

    urlMap[shortCode] = URL;

    const shortenedUrl = `${baseUrl}/${shortCode}`;
    console.log(`Shortened URL: <a href="${shortCode}" target="_blank">${shortenedUrl}</a>`);

    res.status(200).json({
        message: "URL shortened successfully",
        shortCode,
        shortenedUrl
    });
});

app.get("/:shortCode", (req, res) => {
    const URL = urlMap[req.params.shortCode];

    if(URL) {
        res.redirect(URL);
    } else {
        res.status(404).send("URL not found");
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});