import express from "express";
import Book from "../../models/Book.js";
import Request from "../../models/Request.js";
import validateBookData from "../../validation/bookData.js";

const router = express.Router();

router.post("/addnew", (req, res) => {
  const { errors, isValid } = validateBookData(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Book.findOne({ ISBN: req.body.ISBN }).then((book) => {
    if (book) {
      return res.status(400).json({ ISBN: "Book already exists" });
    } else {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        summary: req.body.summary,
        ISBN: req.body.ISBN,
        location: req.body.location,
        availableCopies: req.body.availableCopies,
      });

      newBook.save();
    }
  });
});

router.get("/list", (req, res) => {
  Book.find(
    {},
    {
      title: 1,
      author: 1,
      publisher: 1,
      genre: 1,
      summary: 1,
      ISBN: 1,
      location: 1,
      availableCopies: 1,
      _id: 0,
    },
    (err, books) => {
      res.json({ booksList: books });
    }
  );
});

router.post("/book", (req, res) => {
  let data ={};
  Book.findOne({ ISBN: req.body.id }).then((x) => {
    data.book = x;
  });

  Request.findOne({ username: req.body.username, ISBN: req.body.id }).then((request) => {
    if (request) {
      res.json({ request: request, book: data.book });
    } else {
      res.json({ request: {}, book: data.book });
    }
  });
});

router.post("/edit", (req, res) => {
  const { errors, isValid } = validateBookData(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (req.body.oldISBN !== req.body.ISBN) {
    Book.findOne({ ISBN: req.body.ISBN }).then((book) => {
      if (book) {
        return res
          .status(400)
          .json({ ISBN: "Another Book with ISBN already exists" });
      }
    });
  }

  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    genre: req.body.genre,
    summary: req.body.summary,
    ISBN: req.body.ISBN,
    location: req.body.location,
    availableCopies: req.body.availableCopies,
  });

  Book.findOne({ ISBN: req.body.oldISBN }).then((book) => {
    book.delete();
    newBook.save();

    return res.json({ edited: true });
  });
});

export default router;
