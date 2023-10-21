const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config')

router.post('/upload/multiple', fileUploader.array('imgUrls'), (req, res, next) => {

  if(!req.files){
    next(new Error('No file uploaded'))
    return;
  }

  const fileUrls = req.files.map((file) => file.path);
  res.json({ fileUrls });
});

router.post('/upload/single', fileUploader.single('imgUrl'), (req, res, next)=> {

  if(!req.file){
    next(new Error('No file uploaded'))
    return;
  }

  res.json({fileUrl: req.file.path });
} );

module.exports = router;
