const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

//const myServer = http.createServer((req, res) => myHandler);
const app = express();

app.get("/", (req, res) => {
    return res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {

    if (req.query.name === undefined) return res.send("Hello From About Page");
    return res.send(`Hello ${req.query.name}`);
});

app.get("/contact", (req, res) => {
    return res.send("Hello From Contact Page");
});

app.get("/signup", (req, res) => {
    if (req.method == 'GET') {
        return res.send("This is a signup page");
    } else {
        return res.send("Success");
    }
});

const myServer = http.createServer(app);

app.listen(8000, () => {
    console.log("Server has started");
});
/*
const myHandler= (req, res) => {

    if (res.url == '/favicon.ico') return res.end();
    const myurl = url.parse(req.url)
    const log = `${Date.now()}, ${req.url}, ${req.method}: New Req Recieved\n`;

    console.log(myurl);
    fs.appendFile("log.txt", log, (err, data) =>{
        
        switch(myurl.pathname){

            case '/' : res.end("HomePage"); break;
            case '/about' : res.end("AboutPage"); break;
            case '/contact' : res.end("ContactPage"); break;
            case '/signup' : 
                if (req.method == 'GET') res.end("This is a signup page");
                else res.end("Success");
                break;
            default: res.end("404 Not Found"); break;
            
        }
    });
} 
*/