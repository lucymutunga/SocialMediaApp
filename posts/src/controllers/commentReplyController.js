module.exports ={
    createReply:async (req,res)=>{
        let{user_id,comment_id,text_content}=req.body;
        let pool = req.pool;
        if(pool.connected){
            let results = await pool.request()
            .input('user_id',user_id)
            .input('comment_id',comment_id)
            .input('text_content',text_content)
            .execute('media.CreateReply');
            const result = results.recordsets[0];
            res.json({
                success:true,
                message:'Reply created successfully',
                replyId:result
            });
        }else{
            res.status(500).json({
                success:false,
                message:'internal server error',
                
        });
    }
},
deleteReply: async (req, res) => {
    try {
      let { reply_id } = req.params;
      let pool = req.pool;
      if (pool.connected) {
        let results = await pool
          .request()
          .input('reply_id', reply_id)
          .execute('media.DeleteReply');
  
        if (results.rowsAffected[0] > 0) {
          res.json({
            success: true,
            message: 'Reply deleted successfully',
            results: results[0]
          });
        } else {
          res.json({
            success: false,
            message: 'Reply already deleted'
          });
        }
      } else {
        res.json({
          success: false,
          message: 'Reply does not exist'
        });
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },
  
getReplies: async (req,res)=>{
    try{
        let pool = req.pool;
        if(pool.connected){
            let results = await pool.query('SELECT * FROM media.reply');
            let replies = results.recordset;
            res.json({
                success:true,
                message:'Replies retrieved successfully',
                results:replies.recordset[0]
            });
        }else{
            res.status(500).send('Internal server error');
        }
    }catch(error){
        console.error('Error getting replies:',error);
        res.status(500).json({
            success:false,
            message:'Failed to get replies',
            error:error.message
        });
    }
},

getReplyById: async (req,res)=>{
    try{
        let {reply_id} = req.params;
        let pool = req.pool;
        if(pool.connected){
            let results = await pool.request()
            .input('reply_id',reply_id)
            .execute('media.GetReplyById');
            let reply = results.recordset[0];
            if(results.rowsAffected[0] > 0){
                res.json({
                success:true,
                message:'Reply retrieved successfully',
                results:reply
            });
        }else{
            res.json({
                success:false,
                message:'Reply does not exist',
                results:reply
            })
        }
    }
    }catch(error){
        console.error('Error getting reply:',error);
        res.status(500).json({
            success:false,
            message:'internal server error',
            error:error.message
        });
    }
}
}


    


