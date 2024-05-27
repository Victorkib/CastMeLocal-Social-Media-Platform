const Post = require('../../models/NamModels/posts');
const { v4: uuidv4 } = require('uuid');

const postController = {
  createPost: async (req, res) => {
    try {
      let uniqueId = uuidv4();
      let existingPost = await Post.findOne({ postId: uniqueId });
      while (existingPost) {
        uniqueId = uuidv4();
        existingPost = await Post.findOne({ postId: uniqueId });
      }
      const post = {
        postId: uniqueId(),
        caption: req.body.caption,
        likes: 0,
        comments: '',
      };
      const newPost = Post.create(post);
      await newPost.save();
      return res.status(200).json({ message: 'sucessfully created' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  deletePost: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  updatePost: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewPost: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewAllPosts: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewallUserPosts: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewFollowingPosts: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewPostsNearMe: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  likePost: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  commentPost: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
};

module.exports = postController;
