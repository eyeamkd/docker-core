const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const {
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  MONGO_IP,
  SESSION_SECRET
} = require("./config/config");
const { redisStore, redisClient } = require("./middleware/redis");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`; 

const numberOfTries = 5;
let initialTries = 0;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Successfully connected to the database, Yeayy!"))
    .catch((err) => {
      console.error("Error connecting to the database", err);
      initialTries += 1;
      if (initialTries <= numberOfTries) setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
const port = process.env.PORT || 3000;

app.use(session( 
    { store: new redisStore({ client: redisClient }),
        secret:SESSION_SECRET,
        cookie:{
            secure:false,
            resave:false,
            saveUninitialized: false,
            maxAge: 30000,
            httpOnly:true
        }
    }
    ) 
    );

app.get("/", (req, res) => {
  res.send("<h1>Hello! Kunal Dubey Here checking production status </h1>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log("Server started!!"));
