const { Router } = require('express');
const {register,login,getUser } = require('./user/controller/user');
const router = Router();
const userMiddleware = require('../middleware/userMiddleware')

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser', userMiddleware(), (req, res) => getUser(req, res));


module.exports = router;
