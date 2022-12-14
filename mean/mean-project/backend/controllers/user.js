const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
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
            message: 'Invalid authentication credentials!'
          }
        );
      });
    });
  }

  exports.userLogin = (req, res, next) => {
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
          process.env.JWT_KEY,
          {expiresIn: "1h"}
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        });
      })
      .catch(err => {
        console.log(err);
        res.status(401).json({
          message: "Auth failed!"
        });
      });
  }
