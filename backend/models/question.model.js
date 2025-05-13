import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    enum: ["autumn", "spring", "summer"], // only allow valid terms
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question
