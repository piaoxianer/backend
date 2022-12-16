const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hashPw => {
    const user = new User({
      email: req.body.email,
      password: hashPw
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  // create a new variable to prevent Cross-Origin Request Blocked issue when accessing the remote resource at backend.
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      // console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        "secret_this_should_be_longer",
        {expiresIn: "1h"}
      );
      console.log(token);
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        message: "Auth failed!"
      });
    });
})

module.exports = router;
