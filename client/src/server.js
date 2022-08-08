//Dependancies
import Express from "express";
import mongoose from "mongoose";
import cowsay from "cowsay";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
//Schema Modules
import User from "./client/modules/User.mjs";
import Post from "./client/modules/Post.mjs";
import Message from "./client/modules/Message.mjs";
//Modules
import { fileURLToPath } from "url";
import { dirname } from "path";
import AuthenticateToken from "./client/modules/AuthnticateToken.mjs";
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = Express();

app.use(cookieParser());
app.use(Express.json({ limit: "50mb" }));
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
app.use(Express.static("client/build"));

const { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_API_NAME } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_API_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Posts

app.get("/api/all", async (req, res) => {
  console.log("satan is real");
  res.send({ message: "Satan is ruler" });
});

app.get("/api/posts", async (req, res) => {
  if (req.cookies) console.log(req.cookies);

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

    res.send({ response: "posted a new post" });
  } catch (error) {
    console.log(" oh-no, something went wrong");
    console.log(`error: ${error}`);
  }
});

// Messages

app.get("/api/messages/:user", async (req, res) => {
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
    const user = await User.find({ sub: sub });
    const fullName = `${user[0].firstName} ${user[0].lastName}`;
    res.send({ fullName });
  } else {
    res.send(await User.find());
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await User.find({ _id: id });
    if (Object.keys(answer).length === 1) {
      res.send(answer);
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
      hash: hashedPassword,
      profilePic: uploadedResponse.url,
      dateOfCreation: ` ${new Date()}`,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      address: address,
      certification: certification,
      preferedJobs: preferedJobs,
    });
    await addUser.save(addUser);
    console.log("New user has been added");
    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).cookie("token", accessToken, { httpOnly: true });
    res.send({ accessToken: accessToken });
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
  uniqueEmail.length === 0 ? res.send(true) : res.send(false);
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
          text: `server, DB , port ${process.env.PORT}`,
          e: "Xx",
          T: "U",
        })
      )
    );
  }
);
