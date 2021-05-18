const express = require("express");
const path = require('path');
const cheerio = require("cheerio");
const { default: axios } = require("axios");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => console.log("listening on port 4000"));

app.use(express.static('public'));

async function scrapeProduct(url, api) {
    axios.get(url).then(urlResponse => {
        let config = {
            headers: {
                "Content-Type" : "text/plain"}, 
            responseType: "text"
        }

        const $ = cheerio.load(urlResponse.data);
        // console.log("we made it");
        $('body').each((i, element) => {
            const head = $(element) 
            .find("h1")
            .text();

            const words = $(element)
            .find("h3")
            .text();

            const text = $(element)
            .find("h2")
            .text();

            const bodyText = $(element)
            .find("p")
            .text();

            console.log(bodyText);

             axios.post(api, bodyText, config)
                .then(res => console.log(res.data))
                .catch(error=> console.log(error));
        })
    }, (error) => console.log("err"));

    
}

// function submit() {
//     var url = document.getElementById('url').value;
//     var api = document.getElementById('api').value;
//     console.log(url);
    
// }

app.post("/", function(req, res) {
    var urlLink = req.body.url;
    var apiLink = req.body.api;
        // console.log(`${urlLink} ${apiLink}`);
        console.log("The website we are using: " + urlLink);
    scrapeProduct(urlLink, apiLink);
});



// https://en.wikipedia.org/wiki/Frances_Gertrude_McGill