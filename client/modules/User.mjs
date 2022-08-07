import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: Object },
  hash: { type: Object },
  profilePic: { type: String },
  dateOfCreation: { type: String },
  gender: { type: String },
  emailAddress: { type: String },
  phoneNumber: { type: String },
  address: { type: Object },
  certification: { type: Object },
  preferedJobs: { type: Object },
});

const User = mongoose.model("User", UserSchema);
export default User;
