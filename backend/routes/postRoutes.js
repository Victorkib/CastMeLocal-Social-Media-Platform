const express = require('express');
const postController = require('../controllers/NamsControllers/postController');

const router = express.Router();

router.post('/createpost', postController.createPost);
router.post('/deletepost', postController.deletePost);
router.post('/updatepost', postController.updatePost);
router.post('/viewpost', postController.viewPost);
router.get('/viewallposts', postController.viewAllPosts);
router.post('/viewaluserposts', postController.viewallUserPosts);
router.post('/viewfollowingposts', postController.viewFollowingPosts);
router.post('/viewpostsnearme', postController.viewPostsNearMe);
router.post('/likepost', postController.likePost);
router.post('/commentpost', postController.commentPost);

module.exports = router;
