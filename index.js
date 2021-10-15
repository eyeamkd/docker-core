const express  = require('express');

const app = express() 

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("<h1>Hello! Kunal Dubey Here checking docker compose </h1>")
}) 

app.listen(port,()=> console.log("Server started!!"))