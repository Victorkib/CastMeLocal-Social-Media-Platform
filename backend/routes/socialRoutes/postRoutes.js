const express = require('express');
const userAuth = require('../../middleware/authMiddleware.js');
const {
  commentPost,
  createPost,
  deletePost,
  getComments,
  getPost,
  getPosts,
  getUserPost,
  likePost,
  likePostComment,
  replyPostComment,
} = require('../../controllers/socialControllers/socialPostController.js');

const router = express.Router();

// create post
router.post('/create-post', userAuth, createPost);
// get posts
router.post('/', userAuth, getPosts);
router.post('/:id', userAuth, getPost);

router.post('/get-user-post/:id', userAuth, getUserPost);

// get comments
router.get('/comments/:postId', getComments);

// like and comment on posts
router.post('/like/:id', userAuth, likePost);
router.post('/like-comment/:id/:rid?', userAuth, likePostComment);
router.post('/comment/:id', userAuth, commentPost);
router.post('/reply-comment/:id', userAuth, replyPostComment);

// delete post
router.delete('/:id', userAuth, deletePost);

module.exports = router;
