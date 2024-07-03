import Book from "../models/Book.js";

// export const getBooksByAuthor = async (req, res, next) => {
//     try {
//         const book = await Book.find({ author: req.params.name });
//         res.status(200).json(book);
//     } catch (error) {
//         next(error);
//     }
// }

export const getBooksByAuthor = async (req, res, next) => {
    try {
      const regex = new RegExp(req.params.name, 'i');
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
}

export const getBooksByRating = async (req, res, next) => {
    try {
        //find book rating greater than rating enter
        const book = await Book.find({ avgRating: { $gt: req.params.rating } });
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}