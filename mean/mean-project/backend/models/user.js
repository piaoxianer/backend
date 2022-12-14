// create post model using mongoose
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

// first of all create a blueprint for how your data should look like
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
