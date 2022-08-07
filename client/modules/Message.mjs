import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
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

const Message = mongoose.model("Message", MessageSchema);
export default Message;
