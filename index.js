import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoutes from "./routes/books.js";
import filterRoutes from "./routes/filter.js";
import cors from "cors";
// import bodyParser from 'body-parser';
import Book from "./models/Book.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("initialized connection to db");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", (err) => {
  console.log("mongodb disconnected");
});
mongoose.connection.on("connected", (err) => {
  console.log("mongodb connected");
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const booksFilePath = path.resolve(__dirname, 'books.json'); 

// Read the file contents
const books = JSON.parse(
  fs.readFileSync(booksFilePath, 'utf-8')
);


const importData = async () => {
  try {
    await Book.create(books);
    console.log("Data Loaded Successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all Data from DB
const deleteData = async () => {
  try {
    await Book.deleteMany();
    console.log("Data Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

//middlewares
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/book", bookRoutes);
app.use("/filter", filterRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something went wrong";
  console.log(err);
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
  });
});

app.listen(port, () => {
  connect();
  console.log(`server running on port ${port}`);
});
