const express = require('express');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Array untuk menyimpan data dari file CSV
let books = [];

// Baca file CSV dan masukkan datanya ke dalam array books
fs.createReadStream('books.csv')
  .pipe(csv())
  .on('data', (data) => {
    books.push(data);
  })
  .on('end', () => {
    console.log('Data CSV berhasil dimuat');
  });

// Menambahkan middleware CORS
app.use(cors());

// Endpoint untuk mendapatkan semua buku
app.get('/books', (req, res) => {
  res.json(books);
});

// Endpoint untuk mendapatkan buku berdasarkan ID
app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
});

// Endpoint untuk menambahkan buku baru
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    page: req.body.page
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Endpoint untuk menghapus buku berdasarkan ID
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id));
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Buku berhasil dihapus' });
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
});

const port = 8080; // Port yang ingin Anda gunakan

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
