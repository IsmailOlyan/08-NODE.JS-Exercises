import express from 'express';
import { getBooks, createBook, updateBook, deleteBook, getBookInfo } from '../controllers/books.js';

const router = express.Router();

// 1. Read all books (GET /books)
router.get('/', getBooks);

// 2. Create a new book (POST /books)
router.post('/', createBook);

// 3. Read a specific book (GET /books/:id)
router.get('/:id', getBookInfo);

// 4. Update a book's info (PUT /books/:id)
router.put('/:id', updateBook);

// 5. Delete a book (DELETE /books/:id)
router.delete('/:id', deleteBook);

export default router;