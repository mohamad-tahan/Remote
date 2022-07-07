const { Router } = require('express');
const {register,login,getUser } = require('./user/controller/user');
const{addFiles} = require('./file/controller/file');
const{addLanguages} = require('./language/controller/language')
const router = Router();
const userMiddleware = require('../middleware/userMiddleware')

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser', userMiddleware(), (req, res) => getUser(req, res));

router.post('/auth/addFiles', userMiddleware(), addFiles);

router.post('/auth/addLanguages',addLanguages);

module.exports = router;
