import express from 'express';
import { getBooksByAuthor, getBooksByFilter, getBooksByGenre, getBooksByRating} from '../controllers/filter.js';

const router = express.Router();


router.get("/author/:name", getBooksByAuthor);

router.get("/genre/:genre", getBooksByGenre);

router.get("/orderBy", getBooksByRating);

router.get("/", getBooksByFilter)

export default router;