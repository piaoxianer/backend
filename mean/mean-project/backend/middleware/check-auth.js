const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // the headers' format: "Bearer fadsofijsdfdsjifsd", second element is the token
    console.log('here');
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    // add a field to the request
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }

}
