const express = require("express");
const mongoose = require("mongoose"); 
const {MONGO_PASSWORD,MONGO_PORT,MONGO_USER,MONGO_IP} = require("./config/config"); 

const app = express();

mongoose
  .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => console.log("Successfully connected to the database, Yeayy!"))
  .catch( (err)=>console.log("Error connecting to the same database ",err));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello! Kunal Dubey Here checking production status </h1>");
});

app.listen(port, () => console.log("Server started!!"));
