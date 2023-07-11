const express = require("express");
const { createComment, 
    getComments, 
    getCommentById,
    deleteComment
     } = require("../controllers/commentsController");
    const router2= express.Router();
    router2.post('/comment', createComment);
    router2.get('/comments', getComments);
    router2.get('/comment/:comment_id', getCommentById);
    router2.delete('/comment/:comment_id', deleteComment);
    module.exports = router2; 
