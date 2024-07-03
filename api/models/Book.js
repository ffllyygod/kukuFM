import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    // required: true,
  },
  userRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  avgRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  noOfEpisodes: {
    type: Number,
  },
  runtime: {
    type: String,
  },
  genre: {
    type: String,
  },
  reviews: {
    type: [ReviewSchema],
    default: [],
  },
});

export default mongoose.model("Book", BookSchema);
