


module.exports={
    createComment: async (req,res)=>{
        try{
            let{user_id,post_id,text_content}=req.body;
            const pool = req.pool;
            if(pool.connected){
                let results = await pool.request()
                .input('user_id',user_id)
                .input('post_id',post_id)
                .input('text_content',text_content)
                .execute('media.CreateComment');
                const result = results.recordsets[0];
                res.json({
                    success:true,
                    message:'Comment created successfully',
                    commentId:result
                });
            }else{
                res.status(500).json({
                    success:false,
                    message:'internal server error',
                    
            });
        }
    }catch(error){
            console.error('Error creating comment:',error);
            res.status(500).json({
                success:false,
                message:'Failed to create comment',
                error:error.message
            });
        }
    },

    getComments: async (req,res)=>{
        try{
            let pool = req.pool;
            if(pool.connected){
                let results = await pool.query('SELECT * FROM media.comment');
                let comments = results.recordset;
                res.json({
                    success:true,
                    message:'Comments retrieved successfully',
                    results:comments
                });
            }else{
                res.status(500).send('Internal server error');
            }
        }catch(error){
            console.error('Error getting comments:',error);
            res.status(500).json({
                success:false,
                message:'Failed to get comments',
                error:error.message
            });
        }
    },

    getCommentById: async (req,res)=>{
        try{
            let {comment_id} = req.params;
            let pool = req.pool;
            if(pool.connected){
                let results = await pool.query(`SELECT * FROM media.comment WHERE comment_id = ${Number(comment_id)}`);
                console.log(results);
                let comment = results.recordset[0];
                if(results.recordsets[0].length >0){
                    res.json({
                        success:true,
                        message:'Comment retrieved successfully',
                        results:comment
                    });
                }else{
                    res.json({
                        success:false,
                        message:'Comment not found'
                    });
                }
            }else{
                res.status(500).send('Internal server error');
            }
        }catch(error){
            console.error('Error getting comment:',error);
            res.status(500).json({
                success:false,
                message:'Failed to get comment',
                error:error.message
            });
        }
    },

    deleteComment: async (req,res)=>{
        try{
            let {comment_id} = req.params;
            let pool = req.pool;
            if(pool.connected){
                let results = await pool.query(`DELETE FROM media.comment WHERE comment_id = ${Number(comment_id)}`);
                console.log(results);
                let comment = results.recordset[0];
                if(results.recordsets[0].length >0){
                    res.json({
                        success:true,
                        message:'Comment deleted successfully',
                        results:comment
                    });
                }else{
                    res.json({
                        success:false,
                        message:'Comment not found'
                    });
                }
            }else{
                res.status(500).send('Internal server error');
            }
        }catch(error){
            console.error('Error deleting comment:',error);
            res.status(500).json({
                success:false,
                message:'Failed to delete comment',
                error:error.message
            });
        }
    }
}







    

//




