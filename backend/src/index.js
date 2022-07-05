const { Router } = require('express');
const {register,login,getUser } = require('./user/controller/user');
const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser',(req, res) => getUser(req, res));


module.exports = router;
