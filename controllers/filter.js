import Book from "../models/Book.js";

export const getBooksByAuthor = async (req, res, next) => {
  try {
    const regex = new RegExp(req.params.name, "i");
    const books = await Book.find({ author: { $regex: regex } });
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBooksByGenre = async (req, res, next) => {
  try {
    const book = await Book.find({ genre: req.params.genre });
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooksByRating = async (req, res, next) => {
    try {
      let sortOrder = 1;
  
      if (req.query.order) {
        if (req.query.order === "asc") {
          sortOrder = 1;
        } else if (req.query.order === "desc") {
          sortOrder = -1;
        } else {
          return res.status(400).json({ message: "Invalid sort order parameter" });
        }
      }
  
      console.log("Sort order determined to be:", sortOrder);
  
      const books = await Book.find().sort({ avgRating: sortOrder }).exec();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      next(error);
    }
  };

