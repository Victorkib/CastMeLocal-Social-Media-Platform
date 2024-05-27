const Media = require('../../models/NamModels/media');
const { v4: uuidv4 } = require('uuid');

const mediaController = {
  createMedia: async (req, res) => {
    try {
      let uniqueId = uuidv4();
      let existingMedia = await Media.findOne({ mediaId: uniqueId });
      while (existingMedia) {
        uniqueId = uuidv4;
        existingMedia = await Media.findOne({ mediaId: uniqueId });
      }
      const media = {
        mediaId: uniqueId,
        role: req.body.role,
        roleId: req.body.roleId,
      };
      const newMedia = new Media(media);
      await newMedia.save();
      return res.status(200).json({ message: 'sucessfully Created' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  deleteMedia: async (req, res) => {
    try {
      const mediaId = req.body.mediaId;
      if (!mediaId) {
        return res.status(404).json({ error: 'media not found' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  updateMedia: async (req, res) => {
    try {
      const mediaId = req.body.mediaId;
      if (!mediaId) {
        return res.status(404).json({ error: 'media not found' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewMedia: async (req, res) => {
    try {
      const mediaId = req.body.mediaId;
      if (!mediaId) {
        return res.status(404).json({ error: 'media not found' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
  viewMultipleMedia: async (req, res) => {
    try {
      const mediaId = req.body.mediaId;
      if (!mediaId) {
        return res.status(404).json({ error: 'media not found' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
};

module.exports = mediaController;
