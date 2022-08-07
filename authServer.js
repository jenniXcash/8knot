import Express from "express";
import mongoose from "mongoose";
import cowsay from "cowsay";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
//Modules
import AuthenticateToken from "./client/modules/AuthnticateToken.mjs";
import User from "./client/modules/User.mjs";

//Configs
const app = Express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
app.use(Express.json({ limit: "50mb" }));
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
app.use(Express.static("client/build"));
app.use(cookieParser());

app.get("/logAndAuth/all", AuthenticateToken, async (req, res) => {
  console.log("satan is real");
  console.log(req.user);

  res.send({ message: "satan is real" });
});

app.post("/logAndAuth/login", async (req, res) => {
  const { username, unhashedPassword } = req.body;
  //Finding the user in the DB
  const foundUser = await User.find({ username: username });
  let passwordsMatch;
  if (foundUser.length > 0) {
    passwordsMatch = await bcrypt.compare(unhashedPassword, foundUser[0].hash);
  }
  if (foundUser.length > 0 && passwordsMatch) {
    const accessToken = jwt.sign(
      { id: foundUser[0]._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(foundUser[0].id);
    res.status(201).cookie("token", accessToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
    });
    res.status(201).cookie("username", username, {
      expires: new Date(Date.now() + 1000 * 86400),
    });
    res.status(201).cookie("id", foundUser[0].id, {
      expires: new Date(Date.now() + 1000 * 86400),
    });

    res.send({ response: true });
  } else {
    console.log("404");
    res.status(404).send({ response: "User not found" });
  }
});

app.post("/logAndAuth/logout", async (req, res) => {
  res.clearCookie("token", {
    domain: "localhost",
    path: "/",
    httpOnly: true,
  });
  res.clearCookie("username", {
    domain: "localhost",
    path: "/",
    httpOnly: true,
  });
  res.clearCookie("id", {
    domain: "localhost",
    path: "/",
    httpOnly: true,
  });

  console.log("cookies cleared");
  res.json("cookies cleared");
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
