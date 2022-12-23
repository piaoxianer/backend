const express = require('express');

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const PostController = require('../controllers/posts')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// configure the multer to store things
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
})

router.post(
  '',
  checkAuth,
  multer({storage: storage}).single('image'), PostController.createPost);

router.get('', PostController.getPosts);

router.put(
  '/:id',
  checkAuth,
  multer({storage: storage}).single('image'), PostController.updatePosts)

router.get('/:id', PostController.getPost)

router.delete('/:id', checkAuth, PostController.deletePost)

module.exports = router;
