import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "",
  },
  publisher: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    default: "",
  },
  summary: {
    type: String,
    default: "",
  },
  ISBN: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  availableCopies: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("books", bookSchema);
