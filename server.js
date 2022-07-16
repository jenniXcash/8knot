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

const { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_API_NAME } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_API_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
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
  userSub: { type: String },
});

const User = mongoose.model("User", {
  firstName: { type: String },
  lastName: { type: String },
  username: { type: Object },
  password: { type: Object },
  profilePic: { type: String },
  dateOfCreation: { type: String },
  gender: { type: String },
  emailAddress: { type: String },
  phoneNumber: { type: String },
  address: { type: Object },
  certification: { type: Object },
  preferedJobs: { type: Object },
});

const Message = mongoose.model("Message", {
  sendersSub: { type: String },
  recieversSub: { type: String },
  sendersName: { type: String },
  content: { type: String },
  sendersPic: { type: String },
  date: { type: String },
  time: { type: String },
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
      address,
      method,
      typeOfWork,
      description,
      images,
      equipment,
      userSub,
    } = req.body.postData;

    const postDate = new Date();
    let fixedMinutes = "";
    if (postDate.getMinutes() < 10) {
      fixedMinutes = "0" + postDate.getMinutes();
    } else {
      fixedMinutes = postDate.getMinutes();
    }

    const imagesUrls = await createNewImageUrlsArray(imagesArray);

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
      userSub: userSub,
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

// Messages

app.get("/api/messages/:user", async (req, res) => {
  console.log(`req.params: ${req.params}`);
  const { user } = req.params;
  const messages = await Message.find({ recieversSub: user });
  res.send(messages.reverse());
});

app.get("/api/messages/:id", async (req, res) => {
  const { id } = req.params;
  let message = await Message.find();
  res.send(message);
});

app.post("/api/messages", async (req, res) => {
  try {
    const { content, date, recieversSub, sendersName, sendersSub, time } =
      req.body.message;
    const sPP = await User.find({ auth0User: { sub: sendersSub } });

    const addMessage = new Message({
      content: content,
      date: date,
      recieversSub: recieversSub,
      sendersName: sendersName,
      sendersPic: sPP.profilePic,
      sendersSub: sendersSub,
      time: time,
    });
    console.log(sendersSub);
    await addMessage.save(addMessage);
    res.send(true);
  } catch (error) {
    console.log(error);
  }
});

// Users

app.get("/api/users", async (req, res) => {
  const { sub } = req.query;
  if (sub) {
    console.log(`sub: ${sub}`);
    const user = await User.find({ sub: sub });
    const fullName = `${user[0].firstName} ${user[0].lastName}`;
    console.log(fullName);
    res.send({ fullName });
  } else {
    res.send(await User.find());
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await User.find({ sub: id });
    if (Object.keys(answer).length === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {
    console.log("error", e);
    throw e;
  }
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
      username,
      password,
      dateOfCreation,
      emailAddress,
      phoneNumber,
      address,
      certification,
      preferedJobs,
      profilePic,
    } = req.body.userData;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); //Hashing the password

    const addUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      profilePic: uploadedResponse.url,
      dateOfCreation: ` ${new Date()}`,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      address: address,
      certification: certification,
      preferedJobs: preferedJobs,
      // auth0User: auth0User,
      // authId: auth0User.sub,
    });
    await addUser.save(addUser);
    console.log("New user has been added");
    res.status(201).send({});
  } catch (error) {
    res.status(500).send(error);
  }
});

//Here we are looking to see if the username already exists
//True means that this username is aready occupied, False means that it is not
app.get(`/api/testUsername`, async (req, res) => {
  const { username } = req.query;
  const uniqueUsername = await User.find({ username: username });
  uniqueUsername.length === 0 ? res.send(true) : res.send(false);
});

//Here we are looking to see if the Email address already exists
app.get(`/api/testAddress`, async (req, res) => {
  const { address } = req.query;
  const uniqueEmail = await User.find({ emailAddress: address });
  console.log(uniqueEmail);
  uniqueEmail.length === 0 ? res.send(true) : res.send(false);
});

//Login

const posts = [
  {
    username: "jenia",
    title: "Post 1",
  },
  {
    username: "das",
    title: "Post 2",
  },
];

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

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.${DB_HOST}/?retryWrites=true&w=majority`,
  async (err) => {
    if (err) {
      await console.log("dberror", err);
    }
    app.listen(process.env.PORT || 8000, () =>
      console.log(
        cowsay.say({
          text: "server is conneced, DB is connected",
          e: "Xx",
          T: "U",
        })
      )
    );
  }
);
