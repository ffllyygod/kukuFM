import Book from "../models/Book.js";

export const createBook = async (req, res,next) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const book = await Book.findById(req.body.id);
        book.reviews.push(req.body.review);
        // console.log(book.reviews);
        //also update the avg rating
        let totalRating = 0;
        book.reviews.forEach((review) => {
            totalRating += review.userRating;
        });
        book.avgRating = Math.round((totalRating / book.reviews.length) * 10) / 10;
        // console.log(book.avgRating);
        await book.save();
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        await book.deleteOne();
        res.status(200).json("Book deleted");
    }
    catch (error) {
        next(error);
    }
}

export const getSingleBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

export const getAllBooks = async (req, res, next) => {
    try {
        const book = await Book.find(); 
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}