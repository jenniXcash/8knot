import Express from "express";
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import cowsay from "cowsay";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

const app = Express();
app.use(Express.json({ limit: "50mb" }));
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();
cloudinary.config({
  cloud_name: "eight-knot",
  api_key: "585755652983716",
  api_secret: "Jn-1O2L-7Seji1BystbM7mbAoi4",
});

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
  profilePic: { type: String },
  dateOfCreation: { type: String },
  gender: { type: String },
  emailAddress: { type: String },
  phoneNumber: { type: String },
  city: { type: String },
  certification: { type: Object },
  preferedJobs: { type: Object },
});

// Posts

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

// Israeli setlments

app.get("/api/yeshuvim", async (req, res) => {
  const names = await readFile("./yeshuvim.json", "utf-8");
  res.send(names);
});

// Messages

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

// Users

app.get("/api/users", async (req, res) => {
  res.send(await User.find());
});

app.post("/api/users", async (req, res) => {
  try {
    const ppStr = req.body.data;

    const uploadedResponse = await cloudinary.uploader.upload(ppStr, {
      upload_presets: "profilePics",
    });

    console.log("req.body.userData", req.body.userData);
    console.log(uploadedResponse.url);

    const {
      firstName,
      lastName,
      dateOfCreation,
      emailAddress,
      phoneNumber,
      city,
      certification,
      preferedJobs,
      profilePic,
    } = req.body.userData;

    const addUser = new User({
      firstName: firstName,
      lastName: lastName,
      profilePic: uploadedResponse.url,
      dateOfCreation: ` ${new Date()}`,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      city: city,
      certification: certification,
      preferedJobs: preferedJobs,
    });

    await addUser.save(addUser);
    console.log("New user has been added");

    res.send("New user has been added");
  } catch (error) {
    console.log(error);
  }
});

// app.post("/api/ppupload", async (req, res) => {
//   try {
//     const fileStr = req.body.data;
//     const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_presets: "profilePics",
//     });
//     console.log(uploadedResponse.url);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ err: "in the case that something went horribly wrong" });
//   }
// });

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
