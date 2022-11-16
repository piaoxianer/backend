// create post model using mongoose
const mongoose = require('mongoose');

// first of all create a blueprint for how your data should look like
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: {type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
