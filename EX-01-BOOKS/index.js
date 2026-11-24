const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' },
  { id: 3, title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey' }
];

//1: get all books
app.get('/books', (req, res) => {
    res.json(books);
});

//2: get a book by id
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

//3: POst a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//4: Update a book by id
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

//5: Delete a book by id
app.delete('/books/:id', (req, res) => {
  books = books.filter(u => u.id != req.params.id);
  res.send('Book deleted');
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
