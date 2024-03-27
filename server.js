const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Route for handling POST requests
app.post("/submit", (req, res, next) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    console.log("Received data from client:", req.body);

    if (!firstName || !lastName || !emailAddress || !password) {
        return res.status(400).send("All fields are required");
    }

    const userData = `${firstName} ${lastName} ${emailAddress} ${password}\n`;

    fs.writeFile("users.txt", userData, { flag: "a+" }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
        console.log("Data has been written to users.txt");
        res.sendStatus(200);
    });
});

// Route for serving the HTML page
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
