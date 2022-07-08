const { Router } = require('express');
const {register,login,getUser,updateUser, removeUser } = require('./user/controller/user');
const{addFiles,getFilesbyId,updateFile, removeFile} = require('./file/controller/file');
const{addLanguages} = require('./language/controller/language')
const router = Router();
const userMiddleware = require('../middleware/userMiddleware')

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser', userMiddleware(), (req, res) => getUser(req, res));

router.post('/auth/addFiles', userMiddleware(), addFiles);

router.post('/auth/addLanguages',userMiddleware(), addLanguages);

router.get('/auth/getFilesbyId', userMiddleware(), getFilesbyId);

router.put('/auth/updateFile', userMiddleware(), updateFile);
router.delete('/auth/removeFile',userMiddleware(),  removeFile);

router.put('/auth/updateUser', userMiddleware(), updateUser);

router.delete('/auth/removeUser', userMiddleware(), removeUser);



module.exports = router;
