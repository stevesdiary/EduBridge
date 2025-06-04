const express = require('express');
const cloudflare = require('cloudflare');
const multer = require('multer');
const path = require('path')
const { uploadTOR2 } = require('./upload.service');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await uploadTOR2('../folder/sql.pdf');
    res.json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Internal server error' });
  }
});