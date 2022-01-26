import Express from "express";
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import cowsay from "cowsay";
import { stringify } from "querystring";
const app = Express();
app.use(Express.json());

const Post = mongoose.model("Post", {
  userName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  typeOfWork: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Object, required: false },
});

const User = mongoose.model("User", {
  firstName: { type: String },
  lastName: { type: String },
  dateOfCreation: { type: String },
  gender: { type: String },
  emailAddress: { type: String },
  phoneNumber: { type: String },
  city: { type: String },
  certification: { type: Object },
  preferedJobs: { type: Object },
});

app.get("/", async (req, res) => {
  res.send("satan is real");
});
app.get("/api/posts", async (req, res) => {
  const { term } = req.query;
  try {
    if (term) {
      console.log(term);

      res.send(
        await Post.find({ description: { $regex: term, $options: "gi" } })
      );
    } else {
      res.send(await Post.find());
    }
  } catch (e) {
    console.log("error", e);
    throw e;
  }
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.send(await Post.findById(id));
  } catch (e) {
    throw e;
  }
});

app.get("/api/yeshuvim", async (req, res) => {
  const names = await readFile("./yeshuvim.json", "utf-8");
  res.send(names);
});
app.get("/api/messages", async (req, res) => {
  const messages = await readFile("./messages.json", "utf-8");
  res.send(messages);
});

app.get("/api/messages/:id", async (req, res) => {
  const { id } = req.params;
  let message = await readFile("./messages.json", "utf-8");
  message = JSON.parse(message);
  res.send(message.find((item) => item.id === +id));
});

app.post("/api/users", async (req, res) => {
  console.log(req.body);

  const {
    firstName,
    lastName,
    dateOfCreation,
    gender,
    emailAddress,
    phoneNumber,
    city,
    certification,
    preferedJobs,
  } = req.body;

  const addUser = new User({
    firstName: firstName,
    lastName: lastName,
    dateOfCreation: dateOfCreation,
    gender: gender,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber,
    city: city,
    certification: certification,
    preferedJobs: preferedJobs,
  });

  await addUser.save(addUser);
  res.send("New user has been added");
});

mongoose.connect(`mongodb://127.0.0.1/8knot`, (err) => {
  if (err) {
    console.log("dberror", err);
  }
  app.listen(8000, () =>
    console.log(
      cowsay.say({
        text: "server is conneced, DB is connected",
        e: "Xx",
        T: "U",
      })
    )
  );
});
