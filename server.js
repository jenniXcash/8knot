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
  userName: { type: String },
  date: { type: String },
  time: { type: String },
  address: { type: Object },
  typeOfWork: { type: String },
  method: { type: String },
  description: { type: String },
  equipment: { type: String },
  images: { type: Object },
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
  res.send("Satan is great");
});

app.get("/api/posts", async (req, res) => {
  const { term } = req.query;
  try {
    if (term) {
      console.log(term);
      const postsToSend = await Post.find({
        description: { $regex: term, $options: "gi" },
      });
      res.send(postsToSend.reverse());
    } else {
      const postsToSend = await Post.find();
      res.send(postsToSend.reverse());
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

function sendSingleFileToCloudinary(file) {
  return new Promise((resolve, reject) => {
    resolve(
      cloudinary.uploader.upload(file, {
        upload_presets: "postAttachedImages",
      })
    );
    reject(error);
  });
}

async function createNewImageUrlsArray(files) {
  const urlsArray = [];
  files.forEach((file) => {
    urlsArray.push(sendSingleFileToCloudinary(file));
  });
  const filesUrls = await Promise.all(urlsArray);
  return filesUrls;
}
app.post("/api/posts", async (req, res) => {
  try {
    const imagesArray = req.body.base64EncodedImagesArray;
    const {
      userName,
      date,
      time,
      address,
      method,
      typeOfWork,
      description,
      images,
      equipment,
    } = req.body.postData;

    const postDate = new Date();
    let fixedMinutes = "";
    if (postDate.getMinutes() < 10) {
      fixedMinutes = "0" + postDate.getMinutes();
    } else {
      fixedMinutes = postDate.getMinutes();
    }

    const imagesUrls = await createNewImageUrlsArray(imagesArray);

    // const imagesUrls = imagesArray.map(async (image) => {
    //   const cloudinaryResponse = await cloudinary.uploader.upload(image, {
    //     upload_presets: "postAttachedImages",
    //   });
    //   return await cloudinaryResponse.url;
    // });

    const newPostData = new Post({
      userName: userName,
      date: `${postDate.getDate()}/${
        postDate.getMonth() + 1
      }/${postDate.getFullYear()}`,
      time: `${postDate.getHours()}:${fixedMinutes}`,
      address: address,
      method: method,
      typeOfWork: typeOfWork,
      description: description,
      images: imagesUrls,
      equipment: equipment,
    });

    await newPostData.save(newPostData);

    console.log(newPostData);
    res.send({ response: "posted a new post" });
    console.log(await imagesUrls);
  } catch (error) {
    console.log(" oh-no, something went wrong");
    console.log(`error: ${error}`);
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
    let uploadedResponse = "";
    if (ppStr) {
      uploadedResponse = await cloudinary.uploader.upload(ppStr, {
        upload_presets: "profilePics",
      });
    }

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
    res.send({ response: "New user has been added" });
  } catch (error) {
    console.log(error);
  }
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
