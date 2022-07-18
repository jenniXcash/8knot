import Express from "express";
import mongoose from "mongoose";
import cowsay from "cowsay";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Express();
app.use(Express.json({ limit: "50mb" }));
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();
app.use(Express.static("client/build"));

//Login

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401).send({});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send({});
    req.user = user;
    next();
  });
}

app.get("/logAndAuth/all", async (req, res) => {
  console.log("satan is real");
  res.send({ message: "satan is real" });
});

app.post("/logAndAuth", async (req, res) => {
  const username = req.body.username;
  const recievedPassword = req.body.password;
  const user = { name: username, password: recievedPassword };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log(accessToken);
  res.send({ accessToken: accessToken });
});

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.${DB_HOST}/?retryWrites=true&w=majority`,
  async (err) => {
    if (err) {
      await console.log("dberror", err);
    }
    app.listen(4000, () =>
      console.log(
        cowsay.say({
          text: "server is conneced, port 4000",
          e: "Xx",
          T: "U",
        })
      )
    );
  }
);
