import express from "express";
import Book from "../../models/Book.js";
import Request from "../../models/Request.js";
import validateRequestData from "../../validation/request.js";

const router = express.Router();

router.post("/request", (req, res) => {
  const { errors, isValid } = validateRequestData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const request = new Request({
    ISBN: req.body.ISBN,
    due: req.body.due,
    username: req.body.username,
  });

  request.save();
});

router.get("/listall", (req, res) => {
  Request.find({}, (err, requests) => {
    res.json({ requestList: requests });
  });
});

router.post("/list", (req, res) => {
  Request.find({ username: req.body.username }, (err, requests) => {
    res.json({ requestList: requests });
  });
});

router.patch("/accept", (req, res) => {
  let copies = 0;
  Book.findOne({ ISBN: req.body.ISBN }).then((book) => {
    if (book.availableCopies === 0) return res.status(400);
    else copies = book.availableCopies - 1;
  });
  Book.updateOne({ ISBN: req.body.ISBN }, { $set: { availableCopies: copies } })
    .then((obj) => {})
    .catch((err) => {
      res.status(400);
    });
  Request.updateOne(
    { username: req.body.username, ISBN: req.body.ISBN },
    { $set: { status: "Accepted" } }
  )
    .then((obj) => {})
    .catch((err) => {
      res.status(400);
    });
});

router.patch("/renew", (req, res) => {

  Request.updateOne(
    { username: req.body.username, ISBN: req.body.ISBN },
    { $set: { status: "Accepted", newDue: "", due: req.body.newDue } }
  )
    .then((obj) => {})
    .catch((err) => {
      res.status(400);
    });
});

router.patch("/reject", (req, res) => {
  Request.findOne({ username: req.body.username, ISBN: req.body.ISBN })
    .then((obj) => {
      obj.delete();
    })
    .catch((err) => {
      res.status(400);
    });
});

router.patch("/decline", (req, res) => {
  Request.updateOne(
    { username: req.body.username, ISBN: req.body.ISBN },
    { $set: { status: "Accepted", newDue: "" } }
  )
    .then((obj) => {})
    .catch((err) => {
      res.status(400);
    });
});

router.patch("/renewRequest", (req, res) => {
  Request.updateOne(
    { username: req.body.username, ISBN: req.body.ISBN },
    { $set: { status: "Renew", newDue: req.body.newDue } }
  )
    .then((obj) => {})
    .catch((err) => {
      res.status(400);
    });
});

export default router;
