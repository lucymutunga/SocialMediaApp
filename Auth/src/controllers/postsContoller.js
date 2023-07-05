const mssql= require ('mssql');
const config= require('../config/config');


async function createPost(req, res) {
    const { userId, textContent, imageUrl, vidUrl } = req.body;
    
    try {
      const pool = await mssql.connect(config);
      const request = new mssql.Request(pool);
  
      request.input('userId', mssql.Int, userId);
      request.input('textContent', mssql.VarChar(255), textContent);
      request.input('imageUrl', mssql.VarChar(255), imageUrl);
      request.input('vidUrl', mssql.VarChar(255), vidUrl);
  
      const result = await request.execute('media.CreatePost');
  
      res.json({
        success: true,
        message: 'Post created successfully',
        postId: result.returnValue
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create post',
        error: error.message
      });
    }
  }

  module.exports = {createPost};


  