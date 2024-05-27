const express = require('express');
const mediaController = require('../controllers/NamsControllers/mediaController');

const router = express.Router();

router.post('/createmedia', mediaController.createMedia);
router.post('/deletemedia', mediaController.deleteMedia);
router.post('/updatemedia', mediaController.updateMedia);
router.post('/viewmedia', mediaController.viewMedia);
router.post('/viewmultiplemedia', mediaController.viewMultipleMedia);

module.exports = router;
