const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'SocialUsers' },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  },
  { timestamps: true }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
