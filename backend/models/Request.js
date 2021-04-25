import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  ISBN: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  due: {
    type: Date,
    required: true,
  },
  newDue: {
    type: Date,
    default: "",
  },
  status: {
    type: String,
    default: "Pending",
  },
});

export default mongoose.model("requests", requestSchema);
