// const Post = require('../models/Post');

// exports.createPost = async (req, res) => {
//   try {
//     const newPost = new Post({
//       ...req.body,
//       user_id: req.user.id
//     });
//     const post = await newPost.save();
//     res.status(201).json(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// exports.getPost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }
//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };


const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      user_id: req.user.id
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the current user owns the post
    if (post.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    // Find the post by ID
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Oops! This post is already gone!' });
    }

    // Check if the current user owns the post
    if (post.user_id.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: 'Nice try, but you can only delete your own posts!' });
    }

    // Remove the post
    await post.deleteOne();

    res.json({ success: true, msg: 'Poof! The post has vanished into the digital void!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Uh-oh, something went wrong on our end. The post is still safe... for now!' });
  }
};
