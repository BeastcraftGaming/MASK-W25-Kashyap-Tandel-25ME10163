const express = require("express");
const fs = require("fs");
/*
animes = {
    "Naruto": {
        "title": "Naruto",
        "id": 1,
        "description": "A story about ninjas"
    },
    "Boku no Hero Academia": {
        "title": "Boku no Hero Academia",
        "id": 2,
        "description": "A story about superheroes"
    },
    "One Piece": {
        "title": "One Piece",
        "id": 3,
        "description": "A story about pirates"
    }
};
*/
const animes = JSON.parse(fs.readFileSync("animes.json"));

const app = express();

app.use(express.json());

app.get("/home", (req, res) => {
    res.send("Hello World");
});

app.get("/animes", (req, res) => {
    
    let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Anime List</title>
      </head>
      <body>
        <h1>Anime List</h1>
        <ul>`;

    Object.values(animes).forEach(anime => {
        html += ` <li> ${anime.title} </li>`
    });

    html += `
        </ul>
      </body>
    </html>`;
    res.send(html);
});

app.get("/anime/:name", (req, res) => {
    const anime = Object.values(animes).find(a => a.title.toLowerCase() === req.params.name.toLowerCase());

    console.log(`${req.params.name}`);
    if (anime) {
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${anime.title}</title>
          </head>
          <body>
            <h1>${anime.title}</h1>
            <p>${anime.description}</p>
          </body>
        </html>
      `);
    } else {
        res.send("Anime not found");
    }
});


app.post('/anime', (req, res) => {

  console.log(req.body);
    if (!req.body.title || !req.body.description  || !req.body.id) {
        return res.send("Missing id or title or description");
    }
    const { id, title, description } = req.body;

  // save it in our array
  animes.push({ id, title, description });

  fs.writeFileSync("animes.json", JSON.stringify(animes, null, 2));

}) 
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});