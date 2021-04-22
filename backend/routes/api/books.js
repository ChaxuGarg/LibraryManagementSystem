import express from "express";
import Book from "../../models/Book.js";
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

export default router;
