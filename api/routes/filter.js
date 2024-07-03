import express from 'express';
import { getBooksByAuthor, getBooksByGenre, getBooksByRating } from '../controllers/filter.js';
import { get } from 'mongoose';

const router = express.Router();


router.get("/author/:name", getBooksByAuthor);

router.get("/genre/:genre", getBooksByGenre);

router.get("/rating/:rating", getBooksByRating);



export default router;