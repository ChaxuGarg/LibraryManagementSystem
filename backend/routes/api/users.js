import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../../config/keys.js";
import validateRegisterInput from "../../validation/signup.js";
import validateLoginInput from "../../validation/login.js";
import User from "../../models/User.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    }
  });

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user)
      return res.status(400).json({ usernamenotfound: "Username not found" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          accessLevel: user.accessLevel,
          username: user.username,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/list", (req, res) => {
  User.find(
    {},
    { name: 1, username: 1, accessLevel: 1, email: 1, _id: 0 },
    (err, accounts) => {
      res.json({ accountList: accounts });
    }
  );
});

router.patch("/changeaccess", (req, res) => {
  let access = "";
  if (req.body.accessLevel === "librarian") access = "user";
  else access = "librarian";
  User.updateOne(
    { username: req.body.username },
    { $set: { accessLevel: access } }
  )
    .then((obj) => {})
    .catch((err) => {
      res.status(400);
    });
});

export default router;
