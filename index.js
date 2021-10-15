const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://eyeamkd:edo-okati@172.29.0.2:27017/?authSource=admin")
  .then(() => console.log("Successfully connected to the database, Yeayy!"))
  .catch( (err)=>console.log("Error connecting to the same database ",err));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello! Kunal Dubey Here checking production status </h1>");
});

app.listen(port, () => console.log("Server started!!"));
