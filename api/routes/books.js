import express from 'express';
import { createBook, createReview, deleteBook, getSingleBook, getAllBooks } from '../controllers/book.js';

const router = express.Router();

router.post("/", createBook);

router.post("/review", createReview);

router.delete("/:id", deleteBook);

//get a product
router.get("/:id", getSingleBook);

//get all products
router.get("/", getAllBooks);

// to get asc desc order
// router.get("/orderBy", getBooksByRating);



export default router;