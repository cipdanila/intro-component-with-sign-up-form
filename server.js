const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    "/css",
    express.static(path.join(__dirname, "css"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        },
    })
);

app.use(
    "/js",
    express.static(path.join(__dirname, "js"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".js")) {
                res.setHeader("Content-Type", "text/javascript");
            }
        },
    })
);

app.use(express.static("/"));

// Ruta statică pentru fișierul 'server.js'
app.get("/server.js", (req, res) => {
    // Specificăm tipul de conținut ca JavaScript
    res.type("text/javascript");
    // Trimitem fișierul server.js
    res.sendFile(__dirname + "/server.js");
});

// Route pentru index.html
app.get("/", (req, res) => {
    // Citim fișierul index.html și îl trimitem către client
    fs.readFile("index.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
        res.send(data);
    });
});

app.post("/", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Verificați dacă toate câmpurile sunt completate
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    // Verificați și validați adresa de email
    if (!validateEmail(email)) {
        return res.status(400).send("Invalid email address");
    }

    // Construiți textul pentru a fi scris în fișier
    const userData = `${firstName},${lastName},${email},${password}\n`;

    // Scrieți datele în fișierul 'data.txt'
    fs.writeFile("data.txt", userData, { flag: "a" }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
        console.log("Data has been written to data.txt");
        // Redirecționați clientul către pagina signin.html după ce datele au fost salvate cu succes
        res.redirect("/signin");
    });
});

// Funcția pentru validarea adresei de email
function validateEmail(email) {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regExp.test(email.toLowerCase());
}

// Route pentru autentificare
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // Verificăm dacă emailul și parola corespund
    fs.readFile("data.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        const users = data.split("\n").map((line) => line.split(","));
        const user = users.find((u) => u[2] === email && u[3] === password);

        if (user) {
            res.send(`Success! You have logged in, ${user[0]} ${user[1]}`);
        } else {
            res.status(401).send("Incorrect Email Address or Password");
        }
    });
});

// Pornim serverul
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
