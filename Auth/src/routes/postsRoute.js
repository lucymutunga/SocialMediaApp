const express = require('express');
const {createPost} = require('../controllers/postsContoller');
const router = express.Router();
router.post('/post', createPost);
module.exports = router;
