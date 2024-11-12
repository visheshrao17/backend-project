// const express = require('express');
// const router = express.Router();
// const { createPost, getPost } = require('../controllers/postController');
// const auth = require('../middleware/authMiddleware');

// router.post('/', auth, createPost);
// router.get('/:id', getPost);

// module.exports = router;

const express = require('express');
const router = express.Router();

const { createPost, getPost, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, createPost);

router.get('/:id', getPost);


router.put('/:id', auth, updatePost);


router.delete('/:id', auth, deletePost);

module.exports = router;