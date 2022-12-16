const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // the headers' format: "Bearer fadsofijsdfdsjifsd", second element is the token
    console.log('here');
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }

}
