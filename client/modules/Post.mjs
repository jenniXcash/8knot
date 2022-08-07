import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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

const Post = mongoose.model("Post", PostSchema);
export default Post;
