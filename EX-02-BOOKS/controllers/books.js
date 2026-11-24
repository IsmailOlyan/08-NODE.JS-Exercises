import Book from '../models/Book.js';

// Read all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};


// Create new book
export const createBook = async (req, res) => {
  try {
    
    const book = new Book(req.body);
    const saved = await book.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a book's info
export const updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).send("Book Not Found!");
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Delete book by id
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send("Book Not Found!");
    }

    res.send(`Book id of: ${id} has been deleted successfully!`);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Find book by id
export const getBookInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const bookInfo = await Book.findById(id);  
    if (!bookInfo) {
      return res.status(404).send("Book Not Found!");
    }
    res.json(bookInfo);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};