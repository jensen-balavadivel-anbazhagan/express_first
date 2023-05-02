// Import database

const dbDriver = require(`better-sqlite3`);

//connect DB

const db = dbDriver("bands.sqlite3");

// Import express

const express = require("express");
const req = require("express/lib/request");

//create express app

const app = express();

//Express setup
// Serve a static frontend

app.use(express.static("frontend"));

//Tell express to use json

app.use(express.json());

// Rest API routes
//Get all bands

app.get("/bands", (req, res) => {
  //prepare and execute in one line
  const bands = db.prepare(`SELECT * from bands`).all();

  //send back json
  res.json(bands);
});
// get single band based on url / id
app.get(`/bands/id`, (req, res) => {
  //get the url id
  const id = req.params.id;

  let statement = db.prepare(`SELECT * from bands WHERE id = :id`);
  let result = statement.all({
    id,
  });

  //send back band or error
  res.json(result[0] || { error: "No band matching id" });
});

//start the server

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
