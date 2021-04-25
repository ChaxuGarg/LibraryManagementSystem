import express, { request } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import keys from "./config/keys.js";
import passport from "passport";
import users from "./routes/api/users.js";
import JwtStrategy from "./config/passport.js";
import Cors from "cors";
import books from "./routes/api/books.js";
import requests from "./routes/api/requests.js";

const app = express();
const dbURI = keys.mongoURI;
const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(Cors());

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
JwtStrategy(passport);

app.use("/api/users", users);
app.use("/api/books", books);
app.use("/api/requests", requests);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));