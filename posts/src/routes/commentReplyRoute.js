const  express = require("express");
const {createReply,
getReplies,
deleteReply,
getReplyById}
    = require("../controllers/commentReplyController");
const router3= express.Router();
router3.post('/reply', createReply);
router3.get('/replies',getReplies)
router3.get('/reply/:reply_id', getReplyById);
router3.delete('/reply/:reply_id', deleteReply);
module.exports = router3;

