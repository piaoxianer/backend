const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Ran:' + process.env.MONGO_ATLAS_PW + '@cluster0.ijwubnw.mongodb.net/node-angular?retryWrites=true&w=majority').then(()=>{
  console.log('Connected to database!');
}).catch(()=> {
  console.log('Connection failed!');
});

// return a valid express middleware for parsing json data
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: data}));
// static middleware:
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
