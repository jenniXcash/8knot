import Express from "express";
import mongoose from "mongoose";
import cowsay from "cowsay";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { access } from "fs";
import e from "express";

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

app.get("/posts", authenticateToken, (req, res) => {
  console.log(req.user.name);
  const filtered = posts.filter((post) => post.username === req.user.name);

  res.send(filtered);
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.send({ accessToken: accessToken });
});

app.listen(4000, () =>
  console.log(
    cowsay.say({
      text: "server is conneced, DB is connected",
      e: "Xx",
      T: "U",
    })
  )
);
