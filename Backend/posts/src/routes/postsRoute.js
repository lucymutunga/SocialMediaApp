const express = require('express');
const {createPost,
    getPosts,
    getPostById,
    getPostsByUserId,
    deletePost

} = require('../controllers/postsController');
const router = express.Router();
router.post('/post', createPost);
router.get('/posts', getPosts);
router.get('/post/:post_id', getPostById);
router.get('/post/user/:user_id', getPostsByUserId);
router.delete('/post/:post_id', deletePost);


module.exports = router;