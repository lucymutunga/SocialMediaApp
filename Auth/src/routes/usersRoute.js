const express = require('express');
const { 
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
    userLogin,
} = require('../controllers/usersController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/id/:user_id',getUserById);
router.get('/name/:username',getUserByUsername );
router.post('/create',createUser);
router.post('/login',userLogin);


module.exports = router;